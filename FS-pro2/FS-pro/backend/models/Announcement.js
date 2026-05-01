const mongoose = require('mongoose');

const AnnouncementSchema = new mongoose.Schema({
  title: { type: String, required: true },
  message: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  department: { type: String, default: 'All' }
}, { timestamps: true });

module.exports = mongoose.model('Announcement', AnnouncementSchema);
