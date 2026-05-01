const Announcement = require('../models/Announcement');

// Post an announcement
exports.createAnnouncement = async (req, res) => {
    try {
        const { title, message, department } = req.body;
        const newAnnouncement = new Announcement({
            title,
            message,
            department: department || 'All',
            author: req.userId
        });
        await newAnnouncement.save();
        res.status(201).json(newAnnouncement);
    } catch (err) {
        res.status(500).json({ error: 'Failed to create announcement' });
    }
};

// Get all announcements
exports.getAnnouncements = async (req, res) => {
    try {
        const announcements = await Announcement.find()
            .populate('author', 'name role')
            .sort({ createdAt: -1 });
        res.json(announcements);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch announcements' });
    }
};

// Delete an announcement
exports.deleteAnnouncement = async (req, res) => {
    try {
        await Announcement.findByIdAndDelete(req.params.id);
        res.json({ message: 'Announcement deleted' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete announcement' });
    }
};
