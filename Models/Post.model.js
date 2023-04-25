const mongoose = require("mongoose");
const { ObjectId } = mongoose;

const postSchema = mongoose.Schema({
  user: { type: ObjectId, ref: "User" },
  text: String,
  media: Array,
  createdAt: Date,
  likes: Array,
  comments: Array,
  updatedAt: Date,
});

const postModel = mongoose.model("posts", postSchema);
module.exports = postModel;
