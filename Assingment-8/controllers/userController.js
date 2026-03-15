const bcrypt = require("bcrypt");
const User = require("../models/User");

// Validation functions
const isValidFullName = (fullName) => {
  return /^[A-Za-z ]+$/.test(fullName);
};

const isValidEmail = (email) => {
  return /^\S+@\S+\.\S+$/.test(email);
};

const isValidPassword = (password) => {
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.#])[A-Za-z\d@$!%*?&.#]{8,}$/.test(password);
};

// POST /user/create
const createUser = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
      return res.status(400).json({
        error: "Full name, email, and password are required.",
      });
    }

    if (!isValidFullName(fullName)) {
      return res.status(400).json({
        error: "Full name should contain only alphabetic characters and spaces.",
      });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({
        error: "Invalid email format.",
      });
    }

    if (!isValidPassword(password)) {
      return res.status(400).json({
        error:
          "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.",
      });
    }

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({
        error: "User already exists with this email.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      fullName,
      email: email.toLowerCase(),
      password: hashedPassword,
    });

    await newUser.save();

    return res.status(201).json({
      message: "User created successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      error: "Server error.",
      details: error.message,
    });
  }
};

// PUT /user/edit
const editUser = async (req, res) => {
  try {
    const { email, fullName, password } = req.body;

    if (!email || !fullName || !password) {
      return res.status(400).json({
        error: "Email, full name, and password are required.",
      });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({
        error: "Invalid email format.",
      });
    }

    if (!isValidFullName(fullName)) {
      return res.status(400).json({
        error: "Full name should contain only alphabetic characters and spaces.",
      });
    }

    if (!isValidPassword(password)) {
      return res.status(400).json({
        error:
          "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.",
      });
    }

    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      return res.status(404).json({
        error: "User not found.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user.fullName = fullName;
    user.password = hashedPassword;

    await user.save();

    return res.status(200).json({
      message: "User updated successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      error: "Server error.",
      details: error.message,
    });
  }
};

// DELETE /user/delete
const deleteUser = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        error: "Email is required.",
      });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({
        error: "Invalid email format.",
      });
    }

    const deletedUser = await User.findOneAndDelete({
      email: email.toLowerCase(),
    });

    if (!deletedUser) {
      return res.status(404).json({
        error: "User not found.",
      });
    }

    return res.status(200).json({
      message: "User deleted successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      error: "Server error.",
      details: error.message,
    });
  }
};

// GET /user/getAll
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, { fullName: 1, email: 1, password: 1, _id: 0 });

    return res.status(200).json({
      users,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Server error.",
      details: error.message,
    });
  }
};

// POST /user/uploadImage
const uploadImage = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        error: "Email is required.",
      });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({
        error: "Invalid email format.",
      });
    }

    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      return res.status(404).json({
        error: "User not found.",
      });
    }

    if (user.imagePath) {
      return res.status(400).json({
        error: "Image already exists for this user.",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        error: "Image file is required.",
      });
    }

    user.imagePath = `/images/${req.file.filename}`;
    await user.save();

    return res.status(201).json({
      message: "Image uploaded successfully.",
      filePath: user.imagePath,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Server error.",
      details: error.message,
    });
  }
};

module.exports = {
  createUser,
  editUser,
  deleteUser,
  getAllUsers,
  uploadImage,
};