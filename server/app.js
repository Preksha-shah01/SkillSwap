
const express = require("express");
const cors = require("cors");

// Import API routes
const authRoutes = require("./routes/authRoutes");
const resourceRoutes = require("./routes/resourceRoutes");
const skillRoutes = require("./routes/skillRoutes");
const exchangeRoutes = require("./routes/exchangeRoutes");

// Initialize Express
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Home route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "SkillSwap API is running",
  });
});

// API health check
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "SkillSwap backend is healthy",
  });
});

// Authentication API
app.use("/api/auth", authRoutes);

// Knowledge Hub API
app.use("/api/resources", resourceRoutes);

// Skill Exchange API
app.use("/api/skills", skillRoutes);

app.use("/api/exchanges", exchangeRoutes);

// Handle unknown routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "API endpoint not found",
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("Express error:", err.message);

  res.status(500).json({
    success: false,
    message: "Internal server error",
  });
});

module.exports = app;
