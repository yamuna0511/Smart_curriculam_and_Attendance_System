const mongoose = require('mongoose');
const Attendance = require('./models/Attendance');
const Assignment = require('./models/Assignment');
const Curriculum = require('./models/Curriculum');

mongoose.connect('mongodb://127.0.0.1:27017/smart_curriculum').then(async () => {
    console.log("Attendance count:", await Attendance.countDocuments());
    console.log("Assignment count:", await Assignment.countDocuments());
    console.log("Curriculum count:", await Curriculum.countDocuments());
    process.exit(0);
});
