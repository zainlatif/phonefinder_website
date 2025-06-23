const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  title: { type: String, required: true },
  paragraph: { type: String, required: true },
  image: { type: String },
  link: { type: String },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Review', reviewSchema);