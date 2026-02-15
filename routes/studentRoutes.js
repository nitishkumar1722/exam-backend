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

module.exports = router;
