// filepath: z:\WebDevelopment\simple-mern-login-withDatabase\backend\createAdmin.js
const mongoose = require('mongoose');
const User = require('./models/userModel');

mongoose.connect('mongodb://localhost:27017/mernproducts').then(async () => {
  await User.create({
    email: 'admin1@gmail.com',
    password: '000', // Hash this in production!
    name: 'Admin',
    role: 'admin'
  });
  console.log('Admin user created');
  process.exit();
});