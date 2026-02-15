const express = require("express");
const router = express.Router();
const Exam = require("../models/Exam");

// CREATE EXAM (GET)
router.get("/create", async (req, res) => {
    try {
        const { examTitle, duration, totalMarks, teacherEmail, questionsData } = req.query;

        if (!questionsData) {
            return res.status(400).json({ error: "Questions data missing!" });
        }

        // Data split: Q|O1|O2|O3|O4|Ans separates by ###
        const questionsArray = questionsData.split("###").map(q => {
            const p = q.split("|");
            return { 
                question: p[0], 
                options: [p[1], p[2], p[3], p[4]], 
                answer: p[5] 
            };
        });

        const newExam = new Exam({ 
            examTitle, 
            duration, 
            totalMarks, 
            teacherEmail, 
            questions: questionsArray 
        });

        await newExam.save();
        res.json({ message: "Exam Created Successfully!" });
    } catch (err) {
        console.error("Backend Error:", err);
        res.status(500).json({ error: err.message });
    }
});

// MY EXAMS (GET)
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
