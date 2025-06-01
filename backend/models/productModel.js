const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  image: String,
  longDescription: String // <-- Add this line
});

module.exports = mongoose.model('Product', productSchema);