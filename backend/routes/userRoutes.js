const express = require('express');
const router = express.Router();
const User = require('../models/userModel');

router.post('/signup', async (req, res) => {
  const { email, password } = req.body;
  try {
    const newUser = new User({ email, password });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Signup failed', error });
  }
});

module.exports = router;
