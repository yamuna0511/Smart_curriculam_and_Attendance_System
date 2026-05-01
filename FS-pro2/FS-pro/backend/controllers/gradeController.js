const Grade = require('../models/Grade');
const User = require('../models/User');
const Student = require('../models/Student');

// For Faculty: Add or Update a grade for a student
exports.addGrade = async (req, res) => {
    try {
        const { studentId, title, subject, score, total, department, semester, remarks } = req.body;
        
        // Check if a grade already exists for this student, subject, and exam title
        let grade = await Grade.findOne({ student: studentId, subject, title });

        if (grade) {
            // Update existing grade
            grade.score = score;
            grade.total = total;
            grade.remarks = remarks;
            grade.faculty = req.userId; // Update faculty who last modified it
            await grade.save();
            return res.json({ message: 'Grade updated successfully', grade });
        } else {
            // Create new grade
            const newGrade = new Grade({
                student: studentId,
                faculty: req.userId,
                title,
                subject,
                score,
                total,
                department,
                semester,
                remarks
            });
            await newGrade.save();
            return res.status(201).json({ message: 'Grade added successfully', grade: newGrade });
        }
    } catch (err) {
        console.error('Add/Update Grade Error:', err);
        res.status(500).json({ error: 'Failed to process grade' });
    }
};

// For Faculty: Get students filtered by department and semester
exports.getStudentsForGrading = async (req, res) => {
    try {
        const { department, semester } = req.query;
        if (!department || !semester) {
            return res.status(400).json({ error: 'Department and semester are required' });
        }
        const students = await Student.find({ department, semester }).populate('user', 'name email');
        res.json(students);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch students' });
    }
};

// For Student: Get their own grades
exports.getMyGrades = async (req, res) => {
    try {
        const student = await Student.findOne({ user: req.userId });
        if (!student) {
            return res.status(404).json({ error: 'Student not found' });
        }
        const grades = await Grade.find({ student: req.userId, department: student.department, semester: student.semester })
                                  .populate('faculty', 'name')
                                  .sort({ createdAt: -1 });
        res.json(grades);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch your grades' });
    }
};

// For Faculty: Update an existing grade
exports.updateGrade = async (req, res) => {
    try {
        const { score, total, remarks } = req.body;
        const grade = await Grade.findById(req.params.id);
        
        if (!grade) {
            return res.status(404).json({ error: 'Grade not found' });
        }
        
        grade.score = score;
        grade.total = total;
        grade.remarks = remarks;
        await grade.save();
        
        res.json({ message: 'Grade updated successfully', grade });
    } catch (err) {
        console.error('Update Grade Error:', err);
        res.status(500).json({ error: 'Failed to update grade' });
    }
};

// For Faculty: Get all grades for a specific department and semester
exports.getGradesForDepartment = async (req, res) => {
    try {
        const { department, semester } = req.query;
        if (!department || !semester) {
            return res.status(400).json({ error: 'Department and semester are required' });
        }
        const grades = await Grade.find({ department, semester }).populate('student', 'name email');
        res.json(grades);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch grades' });
    }
};
