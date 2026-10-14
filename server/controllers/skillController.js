
const Skill = require("../models/Skill");

// @desc    Create a new skill offering
// @route   POST /api/skills
// @access  Private
const createSkill = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      proficiencyLevel,
    } = req.body;

    // Validate required fields
    if (
      typeof title !== "string" ||
      !title.trim() ||
      typeof description !== "string" ||
      !description.trim() ||
      typeof category !== "string" ||
      !category.trim() ||
      typeof proficiencyLevel !== "string" ||
      !proficiencyLevel.trim()
    ) {
      return res.status(400).json({
        success: false,
        message: "All skill fields are required",
      });
    }

    // Validate proficiency level
    const allowedLevels = [
      "Beginner",
      "Intermediate",
      "Advanced",
    ];

    if (!allowedLevels.includes(proficiencyLevel)) {
      return res.status(400).json({
        success: false,
        message: "Invalid proficiency level",
      });
    }

    // Save skill under the authenticated student
    const skill = await Skill.create({
      title: title.trim(),
      description: description.trim(),
      category: category.trim(),
      proficiencyLevel,
      offeredBy: req.user._id,
    });

    return res.status(201).json({
      success: true,
      message: "Skill created successfully",
      skill,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    console.error("Create skill error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};


const getSkills = async (req, res) => {
  try {
    const {
      search,
      category,
      proficiencyLevel,
      page = "1",
      limit = "10",
    } = req.query;

    const pageNumber = Number(page);
    const limitNumber = Number(limit);

    if (
      !Number.isSafeInteger(pageNumber) ||
      pageNumber < 1 ||
      !Number.isSafeInteger(limitNumber) ||
      limitNumber < 1 ||
      limitNumber > 50
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid pagination parameters",
      });
    }

    const filter = { isActive: true };

    // Search skill titles and descriptions
    if (typeof search === "string" && search.trim()) {
      const escapedSearch = search.trim().replace(
        /[.*+?^${}()|[\]\\]/g,
        "\\$&"
      );

      filter.$or = [
        { title: { $regex: escapedSearch, $options: "i" } },
        { description: { $regex: escapedSearch, $options: "i" } },
      ];
    }

    if (typeof category === "string" && category.trim()) {
      filter.category = category.trim();
    }

    if (
      typeof proficiencyLevel === "string" &&
      proficiencyLevel.trim()
    ) {
      filter.proficiencyLevel = proficiencyLevel.trim();
    }

    const skip = (pageNumber - 1) * limitNumber;

    const [skills, total] = await Promise.all([
      Skill.find(filter)
        .populate("offeredBy", "name university department")
        .sort({ createdAt: -1, _id: -1 })
        .skip(skip)
        .limit(limitNumber)
        .lean(),

      Skill.countDocuments(filter),
    ]);

    return res.status(200).json({
      success: true,
      skills,
      pagination: {
        page: pageNumber,
        limit: limitNumber,
        total,
        totalPages: Math.ceil(total / limitNumber),
      },
    });
  } catch (error) {
    console.error("Get skills error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};


const mongoose = require("mongoose");

// @desc    Update a skill owned by the logged-in student
// @route   PATCH /api/skills/:id
// @access  Private
const updateSkill = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isObjectIdOrHexString(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid skill ID",
      });
    }

    const skill = await Skill.findById(id);

    if (!skill) {
      return res.status(404).json({
        success: false,
        message: "Skill not found",
      });
    }

    // Only the skill owner can edit it
    if (skill.offeredBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to update this skill",
      });
    }

    const allowedFields = [
      "title",
      "description",
      "category",
      "proficiencyLevel",
    ];

    const submittedFields = Object.keys(req.body || {});

    if (
      submittedFields.length === 0 ||
      submittedFields.some((field) => !allowedFields.includes(field))
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid or missing update fields",
      });
    }

    for (const field of submittedFields) {
      const value = req.body[field];

      if (typeof value !== "string" || !value.trim()) {
        return res.status(400).json({
          success: false,
          message: `${field} must be a non-empty string`,
        });
      }

      skill[field] = value.trim();
    }

    await skill.save();

    return res.status(200).json({
      success: true,
      message: "Skill updated successfully",
      skill,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    console.error("Update skill error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};


const deactivateSkill = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate MongoDB ObjectId
    if (!mongoose.isObjectIdOrHexString(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid skill ID",
      });
    }

    const skill = await Skill.findById(id);

    if (!skill) {
      return res.status(404).json({
        success: false,
        message: "Skill not found",
      });
    }

    // Only the owner can deactivate the skill
    if (skill.offeredBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to deactivate this skill",
      });
    }

    if (!skill.isActive) {
      return res.status(400).json({
        success: false,
        message: "Skill is already deactivated",
      });
    }

    skill.isActive = false;
    await skill.save();

    return res.status(200).json({
      success: true,
      message: "Skill deactivated successfully",
      skill,
    });
  } catch (error) {
    console.error("Deactivate skill error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};




module.exports = {
  createSkill,
  getSkills,
  updateSkill,
  deactivateSkill,
};