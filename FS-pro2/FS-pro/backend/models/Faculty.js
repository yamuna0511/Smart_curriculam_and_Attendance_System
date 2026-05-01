const mongoose = require('mongoose');
const FacultySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  employeeId: { type: String, required: true, unique: true },
  department: { type: String, required: true },
  subjects: [{ type: String }],
}, { timestamps: true });
module.exports = mongoose.model('Faculty', FacultySchema);
