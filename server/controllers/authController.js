
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const generateToken = require("../utils/generateToken");
const admin = require("../config/firebaseAdmin");
const { auth } = require("../config/firebaseAdmin");
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
    if (!user.password) {
  return res.status(401).json({
    success: false,
    message: "This account uses Google Sign-In. Please continue with Google.",
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
// GOOGLE AUTHENTICATION
// POST /api/auth/google
// ======================================

const googleLogin = async (req, res) => {
  try {
    const { idToken } = req.body || {};

    if (typeof idToken !== "string" || !idToken) {
      return res.status(400).json({
        success: false,
        message: "Firebase ID token is required",
      });
    }

    // Verify token signature, expiry, and Firebase project.
    const decoded = await admin.auth().verifyIdToken(idToken);

    const email = decoded.email?.trim().toLowerCase();

    if (!email || decoded.email_verified !== true) {
      return res.status(403).json({
        success: false,
        message: "A verified Google email is required",
      });
    }

    // First find an account already linked to this Firebase UID.
    let user = await User.findOne({
      firebaseUid: decoded.uid,
    });

    if (!user) {
      // Do not automatically link an existing password account
      // based only on matching email.
      const existingEmailAccount = await User.findOne({
        email,
      });

      if (existingEmailAccount) {
        return res.status(409).json({
          success: false,
          message:
            "An account already exists with this email. Sign in using its existing method.",
        });
      }

      user = await User.create({
        name: decoded.name || email.split("@")[0],
        email,
        firebaseUid: decoded.uid,
        university: "GSFC University",
        department: "",
      });
    }

    // Reuse SkillSwap's existing JWT system.
    const token = generateToken(user._id);

    return res.status(200).json({
      success: true,
      message: "Google login successful",
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
      profileIncomplete: !user.department || !user.semester,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "An account with this identity already exists",
      });
    }

    if (
      typeof error.code === "string" &&
      error.code.startsWith("auth/")
    ) {
      return res.status(401).json({
        success: false,
        message: "Google authentication failed. Please try again.",
      });
    }

    console.error("Google authentication error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// ======================================
// EXPORT CONTROLLERS
// ======================================

module.exports = {
  registerUser,
  loginUser,
  getMe,
  googleLogin,
};