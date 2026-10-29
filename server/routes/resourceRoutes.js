
const express = require("express");


const {
  createResource,
  getResources,
  updateResource,
  deleteResource,
  uploadFileResource,
  getResourceById,
  downloadResource,
} = require("../controllers/resourceController");


const { protect } = require("../middleware/authMiddleware");
const { uploadResource } = require("../middleware/uploadMiddleware");

const router = express.Router();

// Browse resources
router.get("/", getResources);

// Upload a document
router.post(
  "/upload",
  protect,
  uploadResource.single("file"),
  uploadFileResource
);

// Create a URL-based resource
router.post("/", protect, createResource);

// Update and delete existing resources
router.patch("/:id", protect, updateResource);
router.delete("/:id", protect, deleteResource);
router.get("/:id/download", downloadResource);
router.get("/:id", getResourceById);

module.exports = router;
