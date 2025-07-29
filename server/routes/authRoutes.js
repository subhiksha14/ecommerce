const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const router = express.Router();

const SECRET_KEY = "your-secret-key"; // You can move this to .env later

// 🔐 Signup Route
router.post("/signup", async (req, res) => {
  const { username, password, role } = req.body;

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword, role });
    await user.save();

    res.status(201).json({ message: "Signup successful" });
  } catch (err) {
    res.status(400).json({ message: "Signup failed", error: err });
  }
});

// 🔑 Login Route
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (user && await bcrypt.compare(password, user.password)) {
      const token = jwt.sign({ id: user._id, role: user.role }, SECRET_KEY, {
        expiresIn: "1h",
      });

      res.status(200).json({
        message: "Login successful",
        role: user.role,
        token,
        userId: user._id,
        username: user.username // ✅ Send username to frontend
      });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (err) {
    res.status(500).json({ message: "Login failed", error: err });
  }
});

module.exports = router;
