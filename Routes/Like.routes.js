const express = require("express");
const likeRouter = express.Router();

const User = require("../Models/User.model");
const Post = require("../Models/Post.model");
const Comment = require("../Models/Comment.model");
const Like = require("../Models/Likes.model");

// Get all likes
likeRouter.get("/likes", async (req, res) => {
  try {
    const likes = await Like.find();

    res.json(likes);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Get a like by ID
likeRouter.get("/likes/:likeId", async (req, res) => {
  const likeId = req.params.likeId;

  try {
    const like = await Like.findById(likeId);

    if (!like) {
      return res.status(404).json({ message: "Like not found" });
    }

    res.json(like);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Create a new like
likeRouter.post("/likes", async (req, res) => {
  const { user, post, comment } = req.body;

  try {
    const author = await User.findById(user);

    if (!author) {
      return res.status(404).json({ message: "User not found" });
    }

    let target;
    
    if (post) {
      target = await Post.findById(post);
      
      if (!target) {
        return res.status(404).json({ message: "Post not found" });
      }
    } else if (comment) {
      target = await Comment.findById(comment);
      
      if (!target) {
        return res.status(404).json({ message: "Comment not found" });
      }
    } else {
      return res.status(400).json({ message: "Bad request" });
    }

    const like = new Like({
      user: author,
      target,
      createdAt: new Date(),
    });

    await like.save();

    res.json(like);
  } catch (err) {
    console.log('err: ', err);
    res.status(500).json({ message: "Server error" });
  }
});

// Delete a like by ID
likeRouter.delete("/likes/:likeId", async (req, res) => {
  const likeId = req.params.likeId;

  try {
    const like = await Like.findByIdAndDelete(likeId);

    if (!like) {
      return res.status(404).json({ message: "Like not found" });
    }

    res.json(like);
  } catch (err) {
    console.log('err: ', err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = likeRouter;
