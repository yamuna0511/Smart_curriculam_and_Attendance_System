const Attendance = require('../models/Attendance');
const Curriculum = require('../models/Curriculum');
const Assignment = require('../models/Assignment');
const Faculty = require('../models/Faculty');
const User = require('../models/User');

exports.markAttendance = async (req, res) => {
    try {
        const { studentId, subject, date, status } = req.body;
        const faculty = await Faculty.findOne({ user: req.userId });
        if(!faculty) return res.status(404).json({ message: 'Faculty not found' });
        
        let attendance = await Attendance.findOne({ student: studentId, subject, date });
        if (attendance) {
            attendance.status = status;
        } else {
            attendance = new Attendance({ student: studentId, faculty: faculty._id, subject, date, status });
        }
        await attendance.save();
        res.json({ message: 'Attendance marked', attendance });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.addAssignment = async (req, res) => {
    try {
        const { title, description, subject, dueDate } = req.body;
        const faculty = await Faculty.findOne({ user: req.userId });
        
        const assignment = new Assignment({ title, description, subject, dueDate, faculty: faculty._id });
        await assignment.save();
        res.status(201).json({ message: 'Assignment created', assignment });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.updateCurriculum = async (req, res) => {
    try {
        const { subject, department, semester, topicName, isCompleted } = req.body;
        let curriculum = await Curriculum.findOne({ subject, department, semester });
        if (!curriculum) {
            curriculum = new Curriculum({ subject, department, semester, topics: [] });
        }
        
        const topicIndex = curriculum.topics.findIndex(t => t.name === topicName);
        if (topicIndex > -1) {
            curriculum.topics[topicIndex].isCompleted = isCompleted;
            if(isCompleted) curriculum.topics[topicIndex].completedDate = new Date();
        } else {
            curriculum.topics.push({ name: topicName, isCompleted, completedDate: isCompleted ? new Date() : null });
        }
        await curriculum.save();
        res.json({ message: 'Curriculum updated', curriculum });
    } catch(err) {
         res.status(500).json({ message: err.message });
    }
};

exports.getStudents = async (req, res) => {
    try {
        const { department, semester } = req.query;
        if (!department || !semester) {
            return res.status(400).json({ message: 'Department and semester are required' });
        }
        const students = await require('../models/Student').find({ department, semester }).populate('user', 'name email');
        res.json(students);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getDashboardStats = async (req, res) => {
    try {
        const faculty = await Faculty.findOne({ user: req.userId });
        if(!faculty) return res.status(404).json({ message: 'Faculty not found' });
        
        const activeAssignments = await Assignment.countDocuments({ faculty: faculty._id, dueDate: { $gte: new Date() } });
        const enrolledStudents = await require('../models/Student').countDocuments();
        
        // Curriculum velocity logic
        const curriculums = await Curriculum.find({ department: faculty.department });
        let totalTopics = 0;
        let completedTopics = 0;
        curriculums.forEach(c => {
            totalTopics += c.topics.length;
            completedTopics += c.topics.filter(t => t.isCompleted).length;
        });
        const velocity = totalTopics > 0 ? Math.round((completedTopics/totalTopics)*100) : 0;
        
        res.json({ activeAssignments, enrolledStudents, curriculumVelocity: velocity });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
