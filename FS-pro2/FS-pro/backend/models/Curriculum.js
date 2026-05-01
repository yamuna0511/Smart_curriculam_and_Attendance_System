const mongoose = require('mongoose');
const TopicSchema = new mongoose.Schema({
  name: { type: String, required: true },
  isCompleted: { type: Boolean, default: false },
  completedDate: { type: Date },
});
const CurriculumSchema = new mongoose.Schema({
  subject: { type: String, required: true },
  department: { type: String, required: true },
  semester: { type: Number, required: true },
  faculty: { type: mongoose.Schema.Types.ObjectId, ref: 'Faculty' },
  topics: [TopicSchema],
}, { timestamps: true });
module.exports = mongoose.model('Curriculum', CurriculumSchema);
