const express = require("express");
const postRouter = express.Router();

const User = require("../Models/User.model");
const Post = require("../Models/Post.model");

// Get all posts
postRouter.get("/posts", async (req, res) => {
  try {
    const posts = await Post.find();

    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Get a post by ID
postRouter.get("/posts/:postId", async (req, res) => {
  const postId = req.params.postId;

  try {
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.json(post);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Create a new post
postRouter.post("/posts", async (req, res) => {
  const { title, content, user } = req.body;

  try {
    const author = await User.findById(user);

    if (!author) {
      return res.status(404).json({ message: "User not found" });
    }

    const post = new Post({
      title,
      content,
      user: author,
      comments: [],
      likes: [],
    });

    await post.save();

    res.json(post);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Update a post by ID
postRouter.put("/posts/:postId", async (req, res) => {
  const postId = req.params.postId;
  const { title, content } = req.body;

  try {
    const post = await Post.findByIdAndUpdate(postId, {
      title,
      content,
    });

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.json(post);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Delete a post by ID
postRouter.delete("/posts/:postId", async (req, res) => {
  const postId = req.params.postId;

  try {
    const post = await Post.findByIdAndDelete(postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.json(post);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = postRouter;
