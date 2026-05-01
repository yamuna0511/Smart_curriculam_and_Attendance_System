const express = require('express');
const router = express.Router();
const facultyController = require('../controllers/facultyController');
const { verifyToken, verifyRole } = require('../middleware/auth');

router.use(verifyToken);
router.use(verifyRole(['Faculty']));

router.post('/attendance', facultyController.markAttendance);
router.post('/assignments', facultyController.addAssignment);
router.post('/curriculum', facultyController.updateCurriculum);
router.get('/students', facultyController.getStudents);
router.get('/dashboard', facultyController.getDashboardStats);

module.exports = router;
