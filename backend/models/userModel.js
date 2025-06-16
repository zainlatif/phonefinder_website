// models/userModel.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email:    { type: String, required: true },
  password: { type: String, required: true },
  name:     String,
  address:  String,
  phone:    String,
  role:     { type: String, default: 'user' }, // 'user' or 'admin'

  // NEW: store ObjectIds of products the user likes
  favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }]
});

module.exports = mongoose.model('User', userSchema);
