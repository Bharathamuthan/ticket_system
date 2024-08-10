const express = require('express');
const router = express.Router();
const submoduleController = require('../controllers/submoduleController');


router.post('/submodule/create', verifyToken, submoduleController.createSubmodule);
router.get('/submodule/list', verifyToken, submoduleController.listSubmodules);
router.put('/submodule/update', verifyToken, submoduleController.updateSubmodule);
router.delete('/submodule/delete', verifyToken, submoduleController.deleteSubmodule);



module.exports = router;