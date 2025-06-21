const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  user: String,
  text: String,
  date: { type: Date, default: Date.now }
});

const specSchema = new mongoose.Schema({
  spec: String,
  value: String,
  extra: String
}, { _id: false });

const productSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  image: String,         // main image
  image2: String,        // second image (optional)
  specs: [specSchema],
  comments: [commentSchema]
});

module.exports = mongoose.model('Product', productSchema);