
const express = require("express");

const {
  createSkill,
  getSkills,
  updateSkill,
  deactivateSkill,
} = require("../controllers/skillController");

const {
  protect,
} = require("../middleware/authMiddleware");

const router = express.Router();

// Public: Browse skills
router.get("/", getSkills);

// Private: Publish a skill
router.post("/", protect, createSkill);

// Private: Update your own skill
router.patch("/:id", protect, updateSkill);

router.patch("/:id/deactivate", protect, deactivateSkill);

module.exports = router;
