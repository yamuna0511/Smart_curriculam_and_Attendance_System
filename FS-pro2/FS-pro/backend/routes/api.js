const express = require('express');
const router = express.Router();
const authRoutes = require('./authRoutes');
const adminRoutes = require('./adminRoutes');
const facultyRoutes = require('./facultyRoutes');
const studentRoutes = require('./studentRoutes');
const reportRoutes = require('./reportRoutes');
const eventRoutes = require('./eventRoutes');
const leaveRoutes = require('./leaveRoutes');
const gradeRoutes = require('./gradeRoutes');
const announcementRoutes = require('./announcementRoutes');
const timetableRoutes = require('./timetableRoutes');

router.use('/auth', authRoutes);
router.use('/admin', adminRoutes);
router.use('/faculty', facultyRoutes);
router.use('/student', studentRoutes);
router.use('/reports', reportRoutes);
router.use('/events', eventRoutes);
router.use('/leave', leaveRoutes);
router.use('/grades', gradeRoutes);
router.use('/announcements', announcementRoutes);
router.use('/timetable', timetableRoutes);

router.get('/health', (req, res) => res.json({ status: 'ok' }));

module.exports = router;
