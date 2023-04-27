const express = require("express");
const commentsRouter = express.Router();

const User = require("../Models/User.model");
const Post = require("../Models/Post.model");
const Comment = require("../Models/Comment.model");
const Likes = require("../Models/Likes.model");

// Get all comments
commentsRouter.get("/comments", async (req, res) => {
  try {
    const comments = await Comment.find();

    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Get a comment by ID
commentsRouter.get("/comments/:commentId", async (req, res) => {
  const commentId = req.params.commentId;

  try {
    const comment = await Comment.findById(commentId);

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    res.json(comment);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Create a new comment
commentsRouter.post("/comments", async (req, res) => {
  const { content, user, post } = req.body;

  try {
    const author = await User.findById(user);

    if (!author) {
      return res.status(404).json({ message: "User not found" });
    }

    const targetPost = await Post.findById(post);

    if (!targetPost) {
      return res.status(404).json({ message: "Post not found" });
    }

    const comment = new Comment({
      content,
      user: author,
      post: targetPost,
      likes: [],
    });

    await comment.save();

    res.json(comment);
  } catch (err) {
    console.log("err: ", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Update a comment by ID
commentsRouter.patch("/comments/:commentId", async (req, res) => {
  const commentId = req.params.commentId;
  const { content } = req.body;

  try {
    const comment = await Comment.findByIdAndUpdate(
      commentId,
      {
        content,
      },
      { new: true }
    );

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    res.json(comment);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Delete a comment by ID
commentsRouter.delete("/comments/:commentId", async (req, res) => {
  const commentId = req.params.commentId;

  try {
    const comment = await Comment.findByIdAndDelete(commentId);

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    res.json(comment);
  } catch (err) {
    console.log('err: ', err);
    res.status(500).json({ message: "Server error" });
  }
});

// Get all likes by a comment
commentsRouter.get("/comment/:commentId/likes", async (req, res) => {
  const commentId = req.params.commentId;

  try {
    const likes = await Likes.find({ comment: commentId });

    res.json(likes);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = commentsRouter;
