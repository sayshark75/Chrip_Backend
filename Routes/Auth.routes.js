const express = require("express");
const User = require("../Models/User.model");
const bcrypt = require("bcrypt");
const { generateToken } = require("../Middlewares/Authorisation.middleware");

const AuthRouter = express.Router();

// Signup route
AuthRouter.post("/signup", async (req, res) => {
  const { name, email, password, ...rest } = req.body;

  // Hash the password using bcrypt
  const salt = await bcrypt.genSalt(5);
  const hashedPassword = await bcrypt.hash(password, salt);

  try {
    // Create a new user in the database with the hashed password
    const user = new User({
      name,
      email,
      password: hashedPassword,
      createdAt: new Date(),
      ...rest,
    });
    await user.save();

    // Send a success response
    res.json({ message: "User created successfully" });
  } catch (error) {
    // Send an error response
    res.status(500).json({ error: error.message });
  }
});

AuthRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Verify the user's password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate a JWT token
    const token = generateToken(user);

    // Send the user data and token in the response
    res.json({ user, token });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// POST route for resetting password
AuthRouter.post("/reset-password", async (req, res) => {
  try {
    const { email, newPassword, confirmPassword, resetToken } = req.body;

    // Check if all required fields are present
    if (!email || !newPassword || !confirmPassword || !resetToken) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if newPassword and confirmPassword match
    if (newPassword !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    // Find the user with the matching reset token
    const user = await User.findOne({
      email,
      resetPasswordToken: resetToken,
      resetPasswordExpires: { $gt: Date.now() },
    });

    // If no user found with the token, return error
    if (!user) {
      return res.status(400).json({ message: "Invalid or expired reset token" });
    }

    // Update the user's password with the new password
    user.password = newPassword;

    // Clear the reset token and expiration date
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    // Save the updated user to the database
    await user.save();

    // Return success message
    return res.status(200).json({ message: "Password successfully reset" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = AuthRouter;
