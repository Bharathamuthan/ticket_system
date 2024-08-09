

const express = require('express');
const router = express.Router();
const { register, login, update, delete: deleteUser, getRoles } = require('../controllers/authController');
const auth = require('../middleware/auth');

router.post('/register', register);
router.post('/login', login);
router.put('/update', auth, update);
router.delete('/delete', auth, deleteUser);
router.get('/roles', getRoles); // Add this line to define the new route

module.exports = router;
