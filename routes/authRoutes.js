const express = require("express");
const router = express.Router();
const Teacher = require("../models/Teacher");
const jwt = require("jsonwebtoken");
const Exam = require("../models/Exam");

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
        message: " Registration is Successfully done.",
        url_check: "..."
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

    if (!teacher) return res.status(400).json({ msg: "Email or Password galat hai apka" });

    const token = jwt.sign({ id: teacher._id }, process.env.JWT_SECRET || "mysecret");
    res.json({ token, msg: "Login Successful" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

router.get("/create", async (req, res) => {
    try {
        const { examTitle, duration, totalMarks, teacherEmail, questionsData } = req.query;
        
        // Data ko split karna: Q|O1|O2|O3|O4|Ans
        const questionsArray = questionsData.split("###").map(q => {
            const p = q.split("|");
            return { question: p[0], options: [p[1], p[2], p[3], p[4]], answer: p[5] };
        });

        const newExam = new Exam({ examTitle, duration, totalMarks, teacherEmail, questions: questionsArray });
        await newExam.save();
        res.json({ message: "Exam Created Successfully!" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
