const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username: String,
  email: String,
  password: String,
  name: String,
  profilePicture: String,
  bio: String,
  followers: Array,
  following: Array,
  createdAt: Date,
  updatedAt: Date,
  resetPasswordToken: String,
  resetPasswordTokenExpiration: Date,
});

const userModel = mongoose.model("users", userSchema);
module.exports = userModel;
