const express = require('express');
const router = express.Router();
const timetableController = require('../controllers/timetableController');
const { verifyToken, verifyRole } = require('../middleware/auth');

router.use(verifyToken);

// Accessible by all users
router.get('/', timetableController.getTimetable);

// Accessible only by Admin and Faculty
router.post('/', verifyRole(['Admin', 'Faculty']), timetableController.addClass);
router.delete('/:id', verifyRole(['Admin', 'Faculty']), timetableController.deleteClass);

module.exports = router;
