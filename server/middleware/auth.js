const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { store } = require("../services/demoStore");

async function protect(req, res, next) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;
  if (!token) return res.status(401).json({ message: "Not authorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "dev-secret");
    if (global.mongoReady) {
      req.user = await User.findById(decoded.id).select("-password");
    } else {
      req.user = store.users.find((user) => user.id === decoded.id);
    }
    if (!req.user) return res.status(401).json({ message: "User not found" });
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
}

module.exports = protect;
