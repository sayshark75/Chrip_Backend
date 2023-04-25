const express = require("express");
const userRouter = express.Router();

const User = require("../Models/User.model");
const Post = require("../Models/Post.model");
const Comment = require("../Models/Comment.model");
const Like = require("../Models/Likes.model");

// Get all users
userRouter.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Get a user by ID
userRouter.get("/users/:userId", async (req, res) => {
  const userId = req.params.userId;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Create a new user
userRouter.post("/users", async (req, res) => {
  const { name, email } = req.body;

  try {
    const user = new User({
      name,
      email,
      createdAt: new Date(),
      posts: [],
      comments: [],
      likes: [],
    });

    await user.save();

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Update a user by ID
userRouter.put("/users/:userId", async (req, res) => {
  const userId = req.params.userId;
  const { name, email } = req.body;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.name = name;
    user.email = email;

    await user.save();

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Delete a user by ID
userRouter.delete("/users/:userId", async (req, res) => {
  const userId = req.params.userId;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Delete all posts, comments, and likes associated with the user
    await Post.deleteMany({ user: userId });
    await Comment.deleteMany({ user: userId });
    await Like.deleteMany({ user: userId });

    await user.remove();

    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Get all posts by a user
userRouter.get("/users/:userId/posts", async (req, res) => {
  const userId = req.params.userId;

  try {
    const posts = await Post.find({ user: userId });

    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Get all comments by users
userRouter.get("/users/:userId/comments", async (req, res) => {
  const userId = req.params.userId;

  try {
    // Find all comments where the user ID matches
    const comments = await Comment.find({ user: userId });

    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Get all likes by a user
userRouter.get("/users/:userId/likes", async (req, res) => {
  const userId = req.params.userId;

  try {
    // Find all likes where the user ID matches
    const likes = await Like.find({ user: userId });

    res.json(likes);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = userRouter;
