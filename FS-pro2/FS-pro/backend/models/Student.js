const mongoose = require('mongoose');
const StudentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  enrollmentNumber: { type: String, required: true, unique: true },
  department: { type: String, required: true },
  semester: { type: Number, required: true },
}, { timestamps: true });
module.exports = mongoose.model('Student', StudentSchema);
