const mongoose = require("mongoose");

const ExamSchema = new mongoose.Schema({
    examTitle: { type: String, required: true },
    duration: { type: String, required: true },
    totalMarks: { type: String, required: true },
    teacherEmail: { type: String, required: true },
    questions: { type: Array, default: [] } 
});

module.exports = mongoose.model("Exam", ExamSchema, "exams");
