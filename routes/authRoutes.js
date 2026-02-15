const express = require("express");
const router = express.Router();
const Teacher = require("../models/Teacher");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// 1. REGISTER (GET Method)
router.get("/register", async (req, res) => {
  try {
    const { email, password } = req.query; // URL se data nikalna
    if (!email || !password) return res.status(400).json({ message: "Email and Password required" });

    const existing = await Teacher.findOne({ email });
    if (existing) return res.status(400).json({ message: "Email already registered" });

    //const hashed = await bcrypt.hash(password, 10);
    const teacher = new Teacher({ email, password: hashed });
    await teacher.save();
    res.json({ message: "Registered Successfully via GET" });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

// 2. LOGIN (GET Method)
router.get("/login", async (req, res) => {
  try {
    const { email, password } = req.query; // URL se data nikalna
    const teacher = await Teacher.findOne({ email });
    if (!teacher) return res.status(400).json({ msg: "User Not found" });

    //const valid = await bcrypt.compare(password, teacher.password);
    if (!valid) return res.status(400).json({ msg: "Wrong password" });

    const token = jwt.sign({ id: teacher._id }, process.env.JWT_SECRET);
    res.json({ token });
  } catch (err) {
    res.status(500).json({ msg: "Login Error" });
  }
});

// 3. RESET PASSWORD (GET Method)
router.get("/reset", async (req, res) => {
  try {
    const { email, newPassword } = req.query;
    //const hashed = await bcrypt.hash(newPassword, 10);
    const updated = await Teacher.findOneAndUpdate({ email }, { password: hashed });
    if (!updated) return res.status(404).json({ message: "Teacher not found" });
    res.json({ message: "Password Updated via GET" });
  } catch (err) {
    res.status(500).json({ message: "Reset Error" });
  }
});

module.exports = router;
