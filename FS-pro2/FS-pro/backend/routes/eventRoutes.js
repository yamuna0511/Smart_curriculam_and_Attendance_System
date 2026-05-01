const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const { verifyToken, verifyRole } = require('../middleware/auth');

// Get all events (accessible by all authenticated users)
router.get('/', verifyToken, eventController.getEvents);

// Create an event (accessible by Admin and Faculty)
router.post('/', verifyToken, verifyRole(['Admin', 'Faculty']), eventController.createEvent);

// Delete an event (accessible by Admin and Faculty)
router.delete('/:id', verifyToken, verifyRole(['Admin', 'Faculty']), eventController.deleteEvent);


module.exports = router;
