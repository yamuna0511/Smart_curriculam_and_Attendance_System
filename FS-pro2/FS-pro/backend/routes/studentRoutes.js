const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
const { verifyToken, verifyRole } = require('../middleware/auth');

router.use(verifyToken);
router.use(verifyRole(['Student']));

router.get('/attendance', studentController.getAttendance);
router.get('/curriculum', studentController.getCurriculum);
router.get('/assignments', studentController.getAssignments);

module.exports = router;
