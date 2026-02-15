const express = require("express");
const router = express.Router();
const Exam = require("../models/Exam");

router.get("/create", async (req, res) => {
    try {
        const { examTitle, duration, totalMarks, teacherEmail, questionsData } = req.query;

        if (!questionsData) {
            return res.status(400).json({ msg: "Questions data gayab hai bhai!" });
        }

        // Parsing logic: Har question line break se alag hai
        const questionsArray = questionsData.split("###").map(q => {
            const p = q.split("|");
            // Agar format galat hai toh skip ya handle karo
            return { 
                question: p[0] || "No Question", 
                options: [p[1] || "", p[2] || "", p[3] || "", p[4] || ""], 
                answer: p[5] || "" 
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
        res.json({ msg: "Exam Created Successfully!" }); // Yahan 'msg' bhej rahe hain
    } catch (err) {
        console.error("Server Error:", err);
        res.status(500).json({ msg: "Server Error: " + err.message });
    }
});

// MY EXAMS fetch karne ke liye
router.get("/my-exams", async (req, res) => {
    try {
        const { teacherEmail } = req.query;
        const exams = await Exam.find({ teacherEmail });
        res.json(exams);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
});


// --- GET SINGLE EXAM FOR STUDENT (GET) ---
router.get("/get-exam", async (req, res) => {
    try {
        const { examId } = req.query;
        const exam = await Exam.findById(examId);
        if (!exam) return res.status(404).json({ msg: "Exam nahi mila!" });
        
        res.json(exam);
    } catch (err) {
        res.status(500).json({ msg: "Server Error: " + err.message });
    }
});



module.exports = router; 
