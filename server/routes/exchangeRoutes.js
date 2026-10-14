
const express = require("express");

const {
  createExchangeRequest,
  getExchangeRequests,
  respondToExchangeRequest,
  cancelExchangeRequest,
} = require("../controllers/exchangeController");

const {
  protect,
} = require("../middleware/authMiddleware");

const router = express.Router();

// View incoming and outgoing exchange requests
router.get("/", protect, getExchangeRequests);

// Send an exchange request
router.post("/", protect, createExchangeRequest);

// Accept or reject an incoming request
router.patch("/:id/accept", protect, (req, res, next) => {
  req.params.action = "accept";
  next();
}, respondToExchangeRequest);

router.patch("/:id/reject", protect, (req, res, next) => {
  req.params.action = "reject";
  next();
}, respondToExchangeRequest);

router.patch("/:id/cancel", protect, cancelExchangeRequest);

module.exports = router;
