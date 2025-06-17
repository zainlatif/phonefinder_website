const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  user: String,      // user's email or name
  text: String,
  date: { type: Date, default: Date.now }
});

const productSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  image: String,
  longDescription: String,
  comments: [commentSchema] // <-- Add this line
});

module.exports = mongoose.model('Product', productSchema);