const express = require("express");
const router = express.Router();
const Exam = require("../models/Exam");


// --- CREATE EXAM (GET) ---
router.get("/create", async (req, res) => {
    try {
        const { examName, duration, totalMarks, teacherEmail } = req.query;
        
        const newExam = new Exam({ 
            examName, 
            duration, 
            totalMarks, 
            teacherEmail // Taaki pata chale kis teacher ne banaya hai
        });

        await newExam.save();
        res.json({ message: "Exam Created! Check URL and DB." });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// --- MY EXAMS (GET) ---
router.get("/my-exams", async (req, res) => {
    try {
        const { teacherEmail } = req.query;
        const exams = await Exam.find({ teacherEmail }); 
        res.json(exams);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
