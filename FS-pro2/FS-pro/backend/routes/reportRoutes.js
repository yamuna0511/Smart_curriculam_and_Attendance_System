const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');
const { verifyToken, verifyRole } = require('../middleware/auth');

router.use(verifyToken);
router.use(verifyRole(['Admin']));

router.get('/dashboard', reportController.getDashboardStats);

module.exports = router;
