const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const postSchema = mongoose.Schema({
  user: { type: ObjectId, ref: "User" },
  title: String,
  media: Array,
  createdAt: Date,
  updatedAt: Date,
});

const postModel = mongoose.model("posts", postSchema);
module.exports = postModel;
