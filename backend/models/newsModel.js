const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
  title: String,
  content: String,
  image: String,
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('News', newsSchema);