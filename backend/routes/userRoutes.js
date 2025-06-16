const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Signup route
router.post('/signup', userController.signupUser);

// Login route
router.post('/login', userController.loginUser);

// Get user by email
router.get('/:email', userController.getUserByEmail);

// Update user
router.put('/update/:email', userController.updateUser);

// Delete user
router.delete('/delete/:email', userController.deleteUser);
//         POST /api/users/favorite/:email  { productId }
router.post('/favorite/:email', userController.addFavorite);
router.post('/unfavorite/:email', userController.removeFavorite);

module.exports = router;