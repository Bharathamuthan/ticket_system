 

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const verifyToken = require('../middleware/auth');

router.post('/register',authController.register);
router.post('/login',authController.login);
router.get('/list',[verifyToken],authController.UserList);
router.put('/update',[verifyToken],authController.update );
router.delete('/delete',[verifyToken],authController.delete );

module.exports = router;
