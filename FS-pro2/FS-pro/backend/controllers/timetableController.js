const Timetable = require('../models/Timetable');

// Add a class to the timetable
exports.addClass = async (req, res) => {
    try {
        const { day, timeSlot, subject, room, department } = req.body;
        const newClass = new Timetable({
            day,
            timeSlot,
            subject,
            room,
            department,
            faculty: req.userId
        });
        await newClass.save();
        res.status(201).json(newClass);
    } catch (err) {
        res.status(500).json({ error: 'Failed to add class to timetable' });
    }
};

// Get the full timetable
exports.getTimetable = async (req, res) => {
    try {
        const schedule = await Timetable.find()
            .populate('faculty', 'name')
            .sort({ day: 1, timeSlot: 1 });
        res.json(schedule);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch timetable' });
    }
};

// Delete a class
exports.deleteClass = async (req, res) => {
    try {
        await Timetable.findByIdAndDelete(req.params.id);
        res.json({ message: 'Class removed from timetable' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete class' });
    }
};
