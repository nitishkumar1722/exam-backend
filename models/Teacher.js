const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: String
});

module.exports = mongoose.model("Teacher", teacherSchema);
