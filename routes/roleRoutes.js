const express = require('express');
const router = express.Router();
const roleController = require('../controllers/roleController');

router.post('/rolecreate', roleController.createRole);
router.get('/rolelist', roleController.listRole);
router.put('/roleupdate/:id', roleController.updateRole);
router.delete('/roledelete/:id', roleController.deleteRole);

module.exports = router;
