const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  name: { type: String },
  address: { type: String },
  phone: { type: String },
});

module.exports = mongoose.model('User', userSchema);
