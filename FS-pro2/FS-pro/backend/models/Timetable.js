const mongoose = require('mongoose');

const TimetableSchema = new mongoose.Schema({
  day: { type: String, required: true, enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'] },
  timeSlot: { type: String, required: true }, // e.g. "09:00 AM - 10:00 AM"
  subject: { type: String, required: true },
  faculty: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  room: { type: String, required: true },
  department: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Timetable', TimetableSchema);
