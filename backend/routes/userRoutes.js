const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Signup route
router.post('/signup', userController.signupUser);

// Get user by email
router.get('/:email', userController.getUserByEmail);

// Update user
router.put('/update/:email', userController.updateUser);

// Delete user
router.delete('/delete/:email', userController.deleteUser);

module.exports = router;