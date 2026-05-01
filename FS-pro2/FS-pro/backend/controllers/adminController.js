const User = require('../models/User');
const Student = require('../models/Student');
const Faculty = require('../models/Faculty');

exports.getUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if(!user) return res.status(404).json({ message: 'User not found' });
        
        if (user.role === 'Student') await Student.deleteOne({ user: user._id });
        if (user.role === 'Faculty') await Faculty.deleteOne({ user: user._id });
        await User.findByIdAndDelete(req.params.id);
        
        res.json({ message: 'User deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
