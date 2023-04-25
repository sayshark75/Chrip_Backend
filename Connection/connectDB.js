const mongoose = require("mongoose");
require("dotenv").config();

const mongoURL = process.env["MONGO_URL"];

const connectDB = mongoose.connect(mongoURL);

module.exports = connectDB;
