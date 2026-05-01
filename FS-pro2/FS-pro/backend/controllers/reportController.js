const User = require('../models/User');
const Attendance = require('../models/Attendance');

exports.getDashboardStats = async (req, res) => {
    try {
        const totalStudents = await User.countDocuments({ role: 'Student' });
        const totalFaculty = await User.countDocuments({ role: 'Faculty' });
        
        const totalRecords = await Attendance.countDocuments();
        const presentRecords = await Attendance.countDocuments({ status: 'Present' });
        const overallAttendance = totalRecords ? ((presentRecords / totalRecords) * 100).toFixed(2) : 0;
        
        res.json({ totalStudents, totalFaculty, overallAttendance });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
