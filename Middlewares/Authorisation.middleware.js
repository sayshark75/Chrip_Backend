const jwt = require("jsonwebtoken");
require("dotenv").config();

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
  const token = req.headers.authorization;
  console.log('token: ', token);

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
