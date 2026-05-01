const express = require('express');
const router = express.Router();
const leaveController = require('../controllers/leaveController');
const { verifyToken, verifyRole } = require('../middleware/auth');

router.use(verifyToken); // All routes require authentication

// Student Routes
router.post('/apply', verifyRole(['Student']), leaveController.applyLeave);
router.get('/my-leaves', verifyRole(['Student']), leaveController.getMyLeaves);

// Faculty/Admin Routes
router.get('/all', verifyRole(['Admin', 'Faculty']), leaveController.getAllLeaves);
router.put('/:id/status', verifyRole(['Admin', 'Faculty']), leaveController.updateLeaveStatus);

module.exports = router;
