const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { store, nextId } = require("../services/demoStore");

function sign(user) {
  return jwt.sign({ id: user._id || user.id }, process.env.JWT_SECRET || "dev-secret", {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });
}

exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  const hash = await bcrypt.hash(password, 10);
  if (global.mongoReady) {
    const existing = await User.findOne({ email });
    if (existing) return res.status(409).json({ message: "Email already registered" });
    const user = await User.create({ name, email, password: hash });
    return res.status(201).json({ user: { name: user.name, email: user.email }, token: sign(user) });
  }
  if (store.users.some((user) => user.email === email)) return res.status(409).json({ message: "Email already registered" });
  const user = { id: nextId("user"), name, email, password: hash };
  store.users.push(user);
  res.status(201).json({ user: { name, email }, token: sign(user) });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = global.mongoReady ? await User.findOne({ email }) : store.users.find((item) => item.email === email);
  if (!user || !(await bcrypt.compare(password, user.password))) return res.status(401).json({ message: "Invalid credentials" });
  res.json({ user: { name: user.name, email: user.email }, token: sign(user) });
};

exports.profile = async (req, res) => {
  res.json({ name: req.user.name, email: req.user.email });
};
