const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema.Types;

const likesSchema = mongoose.Schema({
  user: { type: ObjectId, ref: "users" },
  target: { type: ObjectId },
  createdAt: Date,
  updatedAt: Date,
});

const likesModel = mongoose.model("likes", likesSchema);
module.exports = likesModel;
