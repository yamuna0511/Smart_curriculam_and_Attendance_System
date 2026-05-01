const Leave = require('../models/Leave');

// For Students: Create a leave request
exports.applyLeave = async (req, res) => {
    try {
        const { startDate, endDate, reason } = req.body;
        const newLeave = new Leave({
            student: req.userId, // From verifyToken middleware
            startDate,
            endDate,
            reason
        });
        await newLeave.save();
        res.status(201).json({ message: 'Leave application submitted successfully', leave: newLeave });
    } catch (err) {
        res.status(500).json({ error: 'Failed to submit leave application' });
    }
};

// For Students: Get their own leaves
exports.getMyLeaves = async (req, res) => {
    try {
        const leaves = await Leave.find({ student: req.userId }).sort({ createdAt: -1 });
        res.json(leaves);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch your leaves' });
    }
};

// For Faculty/Admin: Get all leaves (can be filtered by status)
exports.getAllLeaves = async (req, res) => {
    try {
        // Fetch leaves and populate the student details (name, email)
        const leaves = await Leave.find().populate('student', 'name email').sort({ createdAt: -1 });
        res.json(leaves);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch leaves' });
    }
};

// For Faculty/Admin: Update leave status
exports.updateLeaveStatus = async (req, res) => {
    try {
        const { status, facultyComment } = req.body;
        const leaveId = req.params.id;
        
        const leave = await Leave.findByIdAndUpdate(
            leaveId, 
            { status, facultyComment },
            { new: true }
        );
        
        if (!leave) {
            return res.status(404).json({ error: 'Leave request not found' });
        }
        res.json({ message: `Leave ${status} successfully`, leave });
    } catch (err) {
        res.status(500).json({ error: 'Failed to update leave status' });
    }
};
