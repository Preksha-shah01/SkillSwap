
const mongoose = require("mongoose");

const resourceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Resource title is required"],
      trim: true,
      maxlength: 150,
    },

    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
      maxlength: 2000,
    },

    subject: {
      type: String,
      required: [true, "Subject is required"],
      trim: true,
      maxlength: 100,
    },

    resourceType: {
      type: String,
      required: [true, "Resource type is required"],
      enum: ["Notes", "Tutorial", "Video", "Link"],
    },

    resourceUrl: {
      type: String,
      required: [true, "Resource URL is required"],
      trim: true,
      maxlength: 2048,
      validate: {
        validator: function (value) {
          try {
            const url = new URL(value);
            return (
              url.protocol === "http:" ||
              url.protocol === "https:"
            );
          } catch {
            return false;
          }
        },
        message: "Resource URL must be a valid HTTP or HTTPS URL",
      },
    },

    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Resource owner is required"],
    },

    isPublished: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes to improve common queries
resourceSchema.index({ subject: 1, createdAt: -1 });
resourceSchema.index({ uploadedBy: 1, createdAt: -1 });

module.exports = mongoose.model("Resource", resourceSchema);
