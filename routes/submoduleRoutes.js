const express = require('express');
const router = express.Router();
const submoduleController = require('../controllers/submoduleController');
const verifyToken = require('../middleware/auth');

router.post('/create', [verifyToken], submoduleController.createSubmodule);
router.get('/list', [verifyToken], submoduleController.listSubmodules);
router.put('/update', [verifyToken], submoduleController.updateSubmodule);
router.delete('/delete', [verifyToken], submoduleController.deleteSubmodule);



module.exports = router;