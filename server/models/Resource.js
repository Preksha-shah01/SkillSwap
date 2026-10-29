
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
      enum: [
  "Notes",
  "Tutorial",
  "Video",
  "Link",
  "PPTs",
  "Assignments",
  "PYQs",
  "Project Reports"
],
    },

resourceUrl: {
  type: String,
  trim: true,
  maxlength: 2048,
  validate: {
    validator: function (value) {
      if (!value) return true;

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

// Uploaded file information
fileName: {
  type: String,
  trim: true,
},

filePath: {
  type: String,
  select: false,
},

fileType: {
  type: String,
},

fileSize: {
  type: Number,
  min: 0,
},

// Identify whether the resource is a file or an external link
storageType: {
  type: String,
  enum: ["file", "url"],
  default: "url",
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