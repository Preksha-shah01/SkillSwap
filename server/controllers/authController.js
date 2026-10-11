
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const generateToken = require("../utils/generateToken");

// ======================================
// REGISTER NEW STUDENT
// POST /api/auth/register
// ======================================

const registerUser = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      university,
      department,
      semester,
    } = req.body || {};

    // 1. Validate required fields
    if (
      typeof name !== "string" ||
      !name.trim() ||
      typeof email !== "string" ||
      !email.trim() ||
      typeof password !== "string" ||
      !password ||
      typeof university !== "string" ||
      !university.trim()
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Name, email, password and university are required",
      });
    }

    // 2. Validate email format
    const normalizedEmail = email.trim().toLowerCase();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(normalizedEmail)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email address",
      });
    }

    // 3. Validate password length
    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message:
          "Password must contain at least 8 characters",
      });
    }

    // 4. Check whether email already exists
    const existingUser = await User.findOne({
      email: normalizedEmail,
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "An account with this email already exists",
      });
    }

    // 5. Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 12);

    // 6. Create student in MongoDB
    // Never accept role or coins from registration input.
    const user = await User.create({
      name: name.trim(),
      email: normalizedEmail,
      password: hashedPassword,
      university: university.trim(),
      department:
        typeof department === "string"
          ? department.trim()
          : "",
      semester,
    });

    // 7. Return successful response
    // Never return the password hash.
    return res.status(201).json({
      success: true,
      message: "Student registered successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        university: user.university,
        department: user.department,
        semester: user.semester,
        coins: user.coins,
      },
    });
  } catch (error) {
    // Duplicate email race condition
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "An account with this email already exists",
      });
    }

    // Mongoose validation failure
    if (
      error.name === "ValidationError" ||
      error.name === "CastError"
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid registration details",
      });
    }

    console.error("Registration error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// ======================================
// LOGIN STUDENT
// POST /api/auth/login
// ======================================

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body || {};

    // 1. Validate login input
    if (
      typeof email !== "string" ||
      !email.trim() ||
      typeof password !== "string" ||
      !password
    ) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    // 2. Normalize email
    const normalizedEmail = email.trim().toLowerCase();

    // 3. Find student in MongoDB
    // Password is excluded by default in User model.
    const user = await User.findOne({
      email: normalizedEmail,
    }).select("+password");

    // 4. Reject unknown email
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // 5. Ensure password hash exists
    if (
      typeof user.password !== "string" ||
      !user.password
    ) {
      console.error(
        "Login error: User password hash is missing"
      );

      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }

    // 6. Compare entered password with stored hash
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.password
    );

    // 7. Reject incorrect password
    if (!isPasswordCorrect) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // 8. Generate JWT only after successful verification
    const token = generateToken(user._id);

    // 9. Return login response
    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        university: user.university,
        department: user.department,
        semester: user.semester,
        coins: user.coins,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// GET /api/auth/me
const getMe = async (req, res) => {
  const user = req.user;

  return res.status(200).json({
    success: true,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      university: user.university,
      department: user.department,
      semester: user.semester,
      skillsOffered: user.skillsOffered,
      skillsWanted: user.skillsWanted,
      coins: user.coins,
      role: user.role,
    },
  });
};

// ======================================
// EXPORT CONTROLLERS
// ======================================

module.exports = {
  registerUser,
  loginUser,
  getMe,
};