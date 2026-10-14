
const mongoose = require("mongoose");

const skillSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Skill title is required"],
      trim: true,
      maxlength: 100,
    },

    description: {
      type: String,
      required: [true, "Skill description is required"],
      trim: true,
      maxlength: 1000,
    },

    category: {
      type: String,
      required: [true, "Skill category is required"],
      trim: true,
      maxlength: 100,
    },

    proficiencyLevel: {
      type: String,
      required: [true, "Proficiency level is required"],
      enum: ["Beginner", "Intermediate", "Advanced"],
    },

    offeredBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Skill owner is required"],
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Improve queries for active skills and student profiles
skillSchema.index({ isActive: 1, createdAt: -1 });
skillSchema.index({ offeredBy: 1, createdAt: -1 });
skillSchema.index({ category: 1, isActive: 1 });

module.exports = mongoose.model("Skill", skillSchema);
