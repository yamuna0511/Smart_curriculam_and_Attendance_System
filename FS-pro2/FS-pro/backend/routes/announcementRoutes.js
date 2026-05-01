const express = require('express');
const router = express.Router();
const announcementController = require('../controllers/announcementController');
const { verifyToken, verifyRole } = require('../middleware/auth');

router.use(verifyToken);

// Accessible by all users
router.get('/', announcementController.getAnnouncements);

// Accessible only by Admin and Faculty
router.post('/', verifyRole(['Admin', 'Faculty']), announcementController.createAnnouncement);
router.delete('/:id', verifyRole(['Admin', 'Faculty']), announcementController.deleteAnnouncement);

module.exports = router;
