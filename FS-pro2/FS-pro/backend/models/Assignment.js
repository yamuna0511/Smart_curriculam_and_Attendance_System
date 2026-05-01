const mongoose = require('mongoose');
const AssignmentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  subject: { type: String, required: true },
  faculty: { type: mongoose.Schema.Types.ObjectId, ref: 'Faculty', required: true },
  dueDate: { type: Date, required: true },
  fileUrl: { type: String },
}, { timestamps: true });
module.exports = mongoose.model('Assignment', AssignmentSchema);
