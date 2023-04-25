const jwt = require("jsonwebtoken");
require("dotenv").config();
const bcrypt = require("bcrypt");
const User = require("../Models/User.model");

const JWT_SECRET = process.env["JWT_SECRET"];

function generateToken(user) {
  const payload = {
    id: user.id,
    email: user.email,
    name: user.name,
  };

  const options = {
    expiresIn: "12h",
  };

  return jwt.sign(payload, JWT_SECRET, options);
}

function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;
  console.log("authHeader: ", authHeader);
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    req.user = decoded;

    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
}

module.exports = {
  generateToken,
  verifyToken,
};
