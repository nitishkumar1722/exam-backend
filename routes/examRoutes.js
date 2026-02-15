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


// --- BULK CREATE EXAM (GET) ---
router.get("/create", async (req, res) => {
    try {
        const { examName, duration, totalMarks, teacherEmail, questionsData } = req.query;

        // String se Array banana (Questions split karna)
        // Format: "Q1|A|B|C|D|Ans///Q2|A|B|C|D|Ans"
        const questionsArray = questionsData.split("///").map(q => {
            const parts = q.split("|");
            return {
                question: parts[0],
                options: [parts[1], parts[2], parts[3], parts[4]],
                answer: parts[5]
            };
        });

        const newExam = new Exam({ 
            examName, 
            duration, 
            totalMarks, 
            teacherEmail,
            questions: questionsArray // Model mein questions array hona chahiye
        });

        await newExam.save();
        res.json({ message: "Exam Created Successfully with Bulk Questions!" });
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
