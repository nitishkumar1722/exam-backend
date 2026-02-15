const mongoose = require("mongoose");

const ExamSchema = new mongoose.Schema({
    examName: { type: String, required: true },
    duration: { type: String, required: true },
    totalMarks: { type: String, required: true },
    teacherEmail: { type: String, required: true }
    questions: [
        {
            question: String,
            options: [String],
            answer: String
        }
    ]
});


module.exports = mongoose.model("Exam", ExamSchema, "exams");

