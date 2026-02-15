const express = require("express");
const router = express.Router();
const Student = require("../models/Student");

// --- ADD STUDENT (GET) ---
router.get("/add", async (req, res) => {
    try {
        const { name, rollNo, email, examId } = req.query;
        
        const newStudent = new Student({ name, rollNo, email, examId });
        await newStudent.save();
        
        res.json({ message: "Student Added via GET!" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
