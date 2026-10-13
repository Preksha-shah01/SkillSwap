
const Resource = require("../models/Resource");

// @desc    Create a new learning resource
// @route   POST /api/resources
// @access  Private (JWT required)

const createResource = async (req, res) => {
  try {
    const {
      title,
      description,
      subject,
      resourceType,
      resourceUrl,
    } = req.body;

    // Check required fields
    if (
      !title ||
      !description ||
      !subject ||
      !resourceType ||
      !resourceUrl
    ) {
      return res.status(400).json({
        success: false,
        message: "All resource fields are required",
      });
    }

    // Create resource linked to logged-in student
    const resource = await Resource.create({
      title,
      description,
      subject,
      resourceType,
      resourceUrl,
      uploadedBy: req.user._id,
    });

    return res.status(201).json({
      success: true,
      message: "Resource created successfully",
      resource,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    console.error("Create resource error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};


const getResources = async (req, res) => {
  try {
    const {
      search,
      subject,
      resourceType,
      page = "1",
      limit = "10",
    } = req.query;

    const pageNumber = Number(page);
    const limitNumber = Number(limit);

    if (
      !Number.isInteger(pageNumber) ||
      pageNumber < 1 ||
      !Number.isInteger(limitNumber) ||
      limitNumber < 1 ||
      limitNumber > 50
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid pagination parameters",
      });
    }

    const filter = { isPublished: true };

    if (subject) {
      filter.subject = subject;
    }

    if (resourceType) {
      filter.resourceType = resourceType;
    }

    if (search) {
      const escapedSearch = String(search)
        .trim()
        .slice(0, 100)
        .replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

      if (escapedSearch) {
        filter.$or = [
          { title: { $regex: escapedSearch, $options: "i" } },
          { description: { $regex: escapedSearch, $options: "i" } },
        ];
      }
    }

    const skip = (pageNumber - 1) * limitNumber;

    const [resources, total] = await Promise.all([
      Resource.find(filter)
        .populate("uploadedBy", "name university department")
        .sort({ createdAt: -1, _id: -1 })
        .skip(skip)
        .limit(limitNumber)
        .lean(),

      Resource.countDocuments(filter),
    ]);

    return res.status(200).json({
      success: true,
      total,
      page: pageNumber,
      totalPages: Math.ceil(total / limitNumber),
      resources,
    });
  } catch (error) {
    console.error("Get resources error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};


const mongoose = require("mongoose");

// Update a resource owned by the logged-in student
const updateResource = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isObjectIdOrHexString(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid resource ID",
      });
    }

    const resource = await Resource.findById(id);

    if (!resource) {
      return res.status(404).json({
        success: false,
        message: "Resource not found",
      });
    }

    // Only the resource owner may update it
    if (resource.uploadedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You can only edit your own resources",
      });
    }

    const allowedFields = [
      "title",
      "description",
      "subject",
      "resourceType",
      "resourceUrl",
    ];

    const updates = Object.keys(req.body);

    if (
      updates.length === 0 ||
      updates.some((field) => !allowedFields.includes(field))
    ) {
      return res.status(400).json({
        success: false,
        message: "No valid updates provided",
      });
    }

    for (const field of allowedFields) {
      if (Object.prototype.hasOwnProperty.call(req.body, field)) {
        resource[field] = req.body[field];
      }
    }

    await resource.save();

    return res.status(200).json({
      success: true,
      message: "Resource updated successfully",
      resource,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    console.error("Update resource error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Delete a resource owned by the logged-in student
const deleteResource = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isObjectIdOrHexString(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid resource ID",
      });
    }

    const resource = await Resource.findById(id);

    if (!resource) {
      return res.status(404).json({
        success: false,
        message: "Resource not found",
      });
    }

    if (resource.uploadedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You can only delete your own resources",
      });
    }

    await resource.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Resource deleted successfully",
    });
  } catch (error) {
    console.error("Delete resource error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};


module.exports = {
    createResource,
    getResources,
    updateResource,
    deleteResource,
};