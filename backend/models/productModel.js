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
  image: String,
  specs: [specSchema], // <-- use this instead of longDescription
  comments: [commentSchema]
});

module.exports = mongoose.model('Product', productSchema);