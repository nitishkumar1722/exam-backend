const express = require("express");
const router = express.Router();
const Teacher = require("../models/Teacher");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;
    const existing = await Teacher.findOne({ email });
    if (existing) return res.status(400).json({ message: "Email already registered" });

    const hashed = await bcrypt.hash(password, 10);
    const teacher = new Teacher({ email, password: hashed });
    await teacher.save();
    res.json({ message: "Registered Successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const teacher = await Teacher.findOne({ email });
  if (!teacher) return res.status(400).json({ msg: "Not found" });

  const valid = await bcrypt.compare(password, teacher.password);
  if (!valid) return res.status(400).json({ msg: "Wrong password" });

  const token = jwt.sign({ id: teacher._id }, process.env.JWT_SECRET);
  res.json({ token });
});

module.exports = router;

router.post("/reset", async (req, res) => {
  const { email, newPassword } = req.body;
  const hashed = await bcrypt.hash(newPassword, 10);
  await Teacher.findOneAndUpdate({ email }, { password: hashed });
  res.json({ message: "Password Updated" });
});
