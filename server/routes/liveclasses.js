const express = require("express");
const router = express.Router();

let liveClasses = []; // temporary storage

// 🟢 POST - Add new live class
router.post("/", (req, res) => {
  const { title, description, meetLink, date } = req.body;
  const newClass = { id: Date.now(), title, description, meetLink, date };
  liveClasses.push(newClass);
  res.status(201).json({ message: "Live class added", data: newClass });
});

// 🟣 GET - Get all live classes
router.get("/", (req, res) => {
  res.json(liveClasses);
});

module.exports = router;
