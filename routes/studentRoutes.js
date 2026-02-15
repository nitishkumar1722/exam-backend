const express = require("express");
const router = express.Router();
const Student = require("../models/Student");

// ADD STUDENT (GET Method)
router.get("/add", async (req, res) => {
    try {
        const { name, rollNo, examId } = req.query;

        if (!name || !rollNo || !examId) {
            return res.status(400).json({ msg: "Saari details bhariye bhai!" });
        }

        const newStudent = new Student({ name, rollNo, examId });
        await newStudent.save();
        
        res.json({ msg: `Student ${name} added successfully!` });
    } catch (err) {
        res.status(500).json({ msg: "Error: " + err.message });
    }
});


// --- STUDENT LOGIN (GET) ---
router.get("/login", async (req, res) => {
    try {
        const { rollNo } = req.query;

        // Database mein student ko dhoondo
        const student = await Student.findOne({ rollNo });

        if (!student) {
            return res.status(404).json({ msg: "Registration Number nahi mila! Teacher se contact karein." });
        }

        res.json({ 
            msg: "Login Successful!", 
            studentName: student.name, 
            examId: student.examId 
        });
    } catch (err) {
        res.status(500).json({ msg: "Server Error: " + err.message });
    }
});


module.exports = router;
