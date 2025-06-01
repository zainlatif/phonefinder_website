const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  image: String // <-- Add this line
});

module.exports = mongoose.model('Product', productSchema);
