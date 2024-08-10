const express = require('express');
const router = express.Router();

const projectController = require('../controllers/projectController');



router.post('/project/create', verifyToken, projectController.createProject);
router.get('/project/list', verifyToken, projectController.listProjects);
router.put('/project/update', verifyToken, projectController.updateProject);


module.exports = router;