const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    rollNo: { type: String, required: true },
    email: { type: String, required: true },
    examId: { type: String, required: true }
});

module.exports = mongoose.model("Student", StudentSchema, "students");
