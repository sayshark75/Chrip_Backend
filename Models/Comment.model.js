const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const commentSchema = mongoose.Schema({
  user: { type: ObjectId, ref: "User" },
  post: { type: ObjectId, ref: "Post" },
  content: String,
  createdAt: Date,
  updatedAt: Date,
});

const commentModel = mongoose.model("comments", commentSchema);
module.exports = commentModel;
