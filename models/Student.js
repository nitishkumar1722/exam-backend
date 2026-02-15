const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    rollNo: { type: String, required: true }, // Registration Number
    examId: { type: String, required: true }  // Kis exam mein add ho raha hai
});

module.exports = mongoose.model("Student", StudentSchema, "students");
