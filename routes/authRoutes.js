const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Define routes
router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/userlist', authController.UserList);
router.put('/update', authController.update);
router.delete('/delete', authController.delete);

module.exports = router;
