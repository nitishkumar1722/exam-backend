const express = require("express");
const router = express.Router();
const Teacher = require("../models/Teacher");
const jwt = require("jsonwebtoken");

// --- REGISTER (GET Method + Plain Text) ---
router.get("/register", async (req, res) => {
  try {
    const { email, password } = req.query;

    if (!email || !password) return res.status(400).json({ message: "Data missing!" });

    const existing = await Teacher.findOne({ email });
    if (existing) return res.status(400).json({ message: "Email already registered" });

    // Yahan humne Bcrypt HATADIYA hai. Password direct save hoga.
    const teacher = new Teacher({ email, password: password }); 
    await teacher.save();

    res.json({ 
        message: "Success! Ab MongoDB check karo, wahan password dikhega.",
        url_check: "Aur upar URL bar mein bhi password dikh raha hai."
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// --- LOGIN (GET Method + Plain Text Match) ---
router.get("/login", async (req, res) => {
  try {
    const { email, password } = req.query;
    
    // Database mein plain text password dhoond rahe hain
    const teacher = await Teacher.findOne({ email, password: password });

    if (!teacher) return res.status(400).json({ msg: "Email ya Password galat hai" });

    const token = jwt.sign({ id: teacher._id }, process.env.JWT_SECRET || "mysecret");
    res.json({ token, msg: "Login Successful" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

module.exports = router;
