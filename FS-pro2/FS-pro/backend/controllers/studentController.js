const Attendance = require('../models/Attendance');
const Curriculum = require('../models/Curriculum');
const Assignment = require('../models/Assignment');
const Student = require('../models/Student');

exports.getAttendance = async (req, res) => {
    try {
        const student = await Student.findOne({ user: req.userId });
        if(!student) return res.status(404).json({ message: 'Student not found' });
        
        const attendance = await Attendance.find({ student: student._id }).populate('faculty', 'employeeId');
        res.json(attendance);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getCurriculum = async (req, res) => {
    try {
        const student = await Student.findOne({ user: req.userId });
        if(!student) return res.status(404).json({ message: 'Student not found' });
        
        const curriculum = await Curriculum.find({ department: student.department, semester: student.semester });
        res.json(curriculum);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getAssignments = async (req, res) => {
    try {
        const student = await Student.findOne({ user: req.userId });
        if(!student) return res.status(404).json({ message: 'Student not found' });
        
        const assignments = await Assignment.find();
        res.json(assignments);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
