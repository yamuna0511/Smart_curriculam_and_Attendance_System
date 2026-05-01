const mongoose = require('mongoose');

const GradeSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  faculty: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true }, // e.g. "Midterm 1" or "Assignment 3"
  subject: { type: String, required: true },
  score: { type: Number, required: true },
  total: { type: Number, required: true },
  department: { type: String, required: true },
  semester: { type: Number, required: true },
  remarks: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Grade', GradeSchema);
