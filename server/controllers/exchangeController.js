
const mongoose = require("mongoose");
const ExchangeRequest = require("../models/ExchangeRequest");
const Skill = require("../models/Skill");

// POST /api/exchanges
// Private: Send an exchange request
const createExchangeRequest = async (req, res) => {
  try {
    const { skillId, message } = req.body;

    // Validate skill ID
    if (!mongoose.isValidObjectId(skillId)) {
      return res.status(400).json({
        success: false,
        message: "Valid skill ID is required",
      });
    }

    // Validate optional message
    if (
      message !== undefined &&
      (typeof message !== "string" || message.length > 500)
    ) {
      return res.status(400).json({
        success: false,
        message: "Message must be a string of at most 500 characters",
      });
    }

    // Find the skill
    const skill = await Skill.findById(skillId);

    if (!skill || !skill.isActive) {
      return res.status(404).json({
        success: false,
        message: "Active skill not found",
      });
    }

    const requesterId = req.user._id;
    const receiverId = skill.offeredBy;

    // Students cannot request their own skills
    if (requesterId.toString() === receiverId.toString()) {
      return res.status(400).json({
        success: false,
        message: "You cannot request your own skill",
      });
    }

    // Prevent duplicate pending requests
    const existingRequest = await ExchangeRequest.findOne({
      skill: skillId,
      requester: requesterId,
      status: "pending",
    });

    if (existingRequest) {
      return res.status(409).json({
        success: false,
        message: "You already have a pending request for this skill",
      });
    }

    const exchange = await ExchangeRequest.create({
      skill: skillId,
      requester: requesterId,
      receiver: receiverId,
      message: message?.trim() || "",
    });

    return res.status(201).json({
      success: true,
      message: "Exchange request sent successfully",
      exchange,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "You already have a pending request for this skill",
      });
    }

    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    console.error("Create exchange error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};


// GET /api/exchanges
// Private: View incoming and outgoing exchange requests

const getExchangeRequests = async (req, res) => {
  try {
    const userId = req.user._id;

    const { type = "all", status } = req.query;

    // Validate request type
    const allowedTypes = ["all", "incoming", "outgoing"];

    if (!allowedTypes.includes(type)) {
      return res.status(400).json({
        success: false,
        message: "Invalid request type",
      });
    }

    // Validate status if provided
    const allowedStatuses = [
      "pending",
      "accepted",
      "rejected",
      "cancelled",
    ];

    if (status && !allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid exchange status",
      });
    }

    // Build query based on request type
    const filter = {};

    if (type === "incoming") {
      filter.receiver = userId;
    } else if (type === "outgoing") {
      filter.requester = userId;
    } else {
      filter.$or = [
        { requester: userId },
        { receiver: userId },
      ];
    }

    if (status) {
      filter.status = status;
    }

    const exchanges = await ExchangeRequest.find(filter)
      .populate("skill", "title category proficiencyLevel")
      .populate("requester", "name university department")
      .populate("receiver", "name university department")
      .sort({ createdAt: -1, _id: -1 })
      .lean();

    return res.status(200).json({
      success: true,
      total: exchanges.length,
      exchanges,
    });
  } catch (error) {
    console.error("Get exchange requests error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};


const respondToExchangeRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const { action } = req.params;

    // Validate MongoDB ObjectId
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid exchange request ID",
      });
    }

    // Only accept supported actions
    if (!["accept", "reject"].includes(action)) {
      return res.status(400).json({
        success: false,
        message: "Invalid action",
      });
    }

    // Find exchange request
    const exchange = await ExchangeRequest.findById(id);

    if (!exchange) {
      return res.status(404).json({
        success: false,
        message: "Exchange request not found",
      });
    }

    // Only the receiver can accept or reject
    if (exchange.receiver.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to respond to this request",
      });
    }

    // Request must still be pending
    if (exchange.status !== "pending") {
      return res.status(400).json({
        success: false,
        message: "Only pending requests can be accepted or rejected",
      });
    }

    // Atomically update to prevent double responses
    const updatedExchange = await ExchangeRequest.findOneAndUpdate(
      {
        _id: id,
        receiver: req.user._id,
        status: "pending",
      },
      {
        $set: {
          status: action === "accept" ? "accepted" : "rejected",
        },
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedExchange) {
      return res.status(409).json({
        success: false,
        message: "Request has already been processed",
      });
    }

    return res.status(200).json({
      success: true,
      message:
        action === "accept"
          ? "Exchange request accepted successfully"
          : "Exchange request rejected successfully",
      exchange: updatedExchange,
    });
  } catch (error) {
    console.error("Respond to exchange error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};


const cancelExchangeRequest = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate exchange request ID
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid exchange request ID",
      });
    }

    const exchange = await ExchangeRequest.findById(id);

    if (!exchange) {
      return res.status(404).json({
        success: false,
        message: "Exchange request not found",
      });
    }

    // Only the requester can cancel
    if (
      exchange.requester.toString() !==
      req.user._id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: "You cannot cancel another student's request",
      });
    }

    // Only pending requests can be cancelled
    if (exchange.status !== "pending") {
      return res.status(400).json({
        success: false,
        message: "Only pending requests can be cancelled",
      });
    }

    // Atomic update prevents conflicting status changes
    const cancelledExchange =
      await ExchangeRequest.findOneAndUpdate(
        {
          _id: id,
          requester: req.user._id,
          status: "pending",
        },
        {
          $set: { status: "cancelled" },
        },
        {
          new: true,
          runValidators: true,
        }
      );

    if (!cancelledExchange) {
      return res.status(409).json({
        success: false,
        message: "Request has already been processed",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Exchange request cancelled successfully",
      exchange: cancelledExchange,
    });
  } catch (error) {
    console.error(
      "Cancel exchange request error:",
      error.message
    );

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};


module.exports = {
  createExchangeRequest,
  getExchangeRequests,
  respondToExchangeRequest,
  cancelExchangeRequest,
};