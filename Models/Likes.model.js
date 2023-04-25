const mongoose = require("mongoose");

const { ObjectId } = mongoose;

const likesSchema = mongoose.Schema({
  user: { type: ObjectId, ref: "users" },
  post: { type: ObjectId, ref: "posts" },
  createdAt: Date,
  updatedAt: Date,
});

const likesModel = mongoose.model("likes", likesSchema);
module.exports = likesModel;
