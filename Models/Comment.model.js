const mongoose = require("mongoose");
const {ObjectId} = mongoose

const commentSchema = mongoose.Schema({
  "user": { type: ObjectId, ref: "users" },
  "post": { type: ObjectId, ref: "posts" },
  "text": String,
  "createdAt": Date,
  "updatedAt": Date
});

const commentModel = mongoose.model("comments", commentSchema);
module.exports = commentModel;
