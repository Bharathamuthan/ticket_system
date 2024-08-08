const express = require('express');
const router = express.Router();
const usercontroller = require('../controller/usercontroller');
const authediction = require('../middleware/authendication')

// Register a new user
router.post('/register',usercontroller.registerUser);
 
//Login User
router.post('/login',usercontroller.loginUser)

// Get all users
router.get('/',authediction,usercontroller.getAllUsers);

// Get a single user by ID
router.get('/:id',authediction, usercontroller.getUserById);

// Update a user by ID
router.put('/:id',authediction, usercontroller.updateUserById);

// Delete a user by ID
router.delete('/:id',authediction, usercontroller.deleteUserById);

module.exports = router;
