const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const projectController = require('../controllers/projectController');
const verifyToken = require('../middleware/authMiddleware');

// User routes
router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/list', verifyToken, authController.UserList);
router.put('/update', verifyToken, authController.update);
router.delete('/delete', verifyToken, authController.delete);

// Project routes
router.post('/project/create', verifyToken, projectController.createProject);
router.get('/project/list', verifyToken, projectController.listProjects);
router.put('/project/update', verifyToken, projectController.updateProject);

module.exports = router;
