
const express = require("express");

const {
  createResource,
  getResources,
  updateResource,
  deleteResource,
} = require("../controllers/resourceController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Public: Browse resources
router.get("/", getResources);

// Private: Create a resource
router.post("/", protect, createResource);

// Private: Update or delete your own resource
router.patch("/:id", protect, updateResource);
router.delete("/:id", protect, deleteResource);

module.exports = router;
