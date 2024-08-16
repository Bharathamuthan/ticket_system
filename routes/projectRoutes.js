const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const verifyToken = require('../middleware/auth');

router.post('/create', [verifyToken], projectController.createProject);
router.get('/list', [verifyToken], projectController.listProject);
router.put('/update', [verifyToken], projectController.updateProject);

module.exports = router;