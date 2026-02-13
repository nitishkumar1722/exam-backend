const express = require("express");
const router = express.Router();
// Yahan hum authentication middleware ka use karenge jo aapke token ko verify karega
const jwt = require("jsonwebtoken");

// Simple verification logic
const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) return res.status(403).json({ message: "No token provided" });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ message: "Unauthorized" });
    req.userId = decoded.id;
    next();
  });
};

router.post("/create", verifyToken, async (req, res) => {
  try {
    const { title, duration } = req.body;
    // Abhi ke liye success message bhej rahe hain
    res.json({ message: `Exam '${title}' created successfully!` });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

router.post("/add-student", verifyToken, async (req, res) => {
  try {
    const { name, reg } = req.body;
    res.json({ message: `Student ${name} added to the exam list.` });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
