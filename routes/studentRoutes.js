const express = require("express");
const router = express.Router();

router.post("/login", async (req, res) => {
  const { name, reg } = req.body;
  
  // Abhi ke liye simple check: agar name aur reg provide kiya hai toh login success
  if (name && reg) {
    res.json({ success: true, message: "Student logged in" });
  } else {
    res.status(400).json({ success: false, message: "Invalid credentials" });
  }
});

router.get("/exams", async (req, res) => {
  // Demo data for frontend testing
  const exams = [
    { title: "Mathematics Quiz", duration: 30 },
    { title: "Science Midterm", duration: 60 }
  ];
  res.json(exams);
});

module.exports = router;
