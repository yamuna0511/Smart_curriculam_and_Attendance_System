const express = require('express');
const router = express.Router();
const gradeController = require('../controllers/gradeController');
const { verifyToken, verifyRole } = require('../middleware/auth');

router.use(verifyToken);

// Faculty Routes
router.post('/add', verifyRole(['Faculty', 'Admin']), gradeController.addGrade);
router.get('/students', verifyRole(['Faculty', 'Admin']), gradeController.getStudentsForGrading);
router.put('/update/:id', verifyRole(['Faculty', 'Admin']), gradeController.updateGrade);
router.get('/department', verifyRole(['Faculty', 'Admin']), gradeController.getGradesForDepartment);

// Student Routes
router.get('/my-grades', verifyRole(['Student']), gradeController.getMyGrades);

module.exports = router;
