const express = require("express");
const router = express.Router();
const Teacher = require("../models/Teacher");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// 1. REGISTER (Ab GET se - Data URL mein jayega)
router.get("/register", async (req, res) => {
  try {
    // GET mein req.body nahi, req.query use hota hai
    const { email, password } = req.query; 
    
    const existing = await Teacher.findOne({ email });
    if (existing) return res.status(400).json({ message: "Email already registered" });

    const hashed = await bcrypt.hash(password, 10);
    const teacher = new Teacher({ email, password: hashed });
    await teacher.save();
    
    res.json({ 
        message: "Registered Successfully via GET",
        note: "Aapka data URL mein leak ho raha hai!" 
    });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

// 2. LOGIN (Ab GET se)
router.get("/login", async (req, res) => {
  try {
    const { email, password } = req.query;

    const teacher = await Teacher.findOne({ email });
    if (!teacher) return res.status(400).json({ msg: "User Not found" });

    const valid = await bcrypt.compare(password, teacher.password);
    if (!valid) return res.status(400).json({ msg: "Wrong password" });

    const token = jwt.sign({ id: teacher._id }, process.env.JWT_SECRET);
    res.json({ token, method: "GET" });
  } catch (err) {
    res.status(500).json({ msg: "Login Error" });
  }
});

// 3. RESET PASSWORD (Ab GET se)
router.get("/reset", async (req, res) => {
  try {
    const { email, newPassword } = req.query;
    const hashed = await bcrypt.hash(newPassword, 10);
    
    const updated = await Teacher.findOneAndUpdate({ email }, { password: hashed });
    if (!updated) return res.status(404).json({ message: "Teacher not found" });
    
    res.json({ message: "Password Updated via GET" });
  } catch (err) {
    res.status(500).json({ message: "Reset Error" });
  }
});

module.exports = router;
