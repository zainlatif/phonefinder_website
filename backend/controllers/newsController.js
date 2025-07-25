const News = require('../models/newsModel');

// Get all news
exports.getAllNews = async (req, res) => {
  const news = await News.find().sort({ date: -1 });
  res.json(news);
};

// Add news (admin only)
exports.addNews = async (req, res) => {
  const { title, content, image } = req.body;
  const news = new News({ title, content, image });
  await news.save();
  res.json(news);
};

// Update news (admin only)
exports.updateNews = async (req, res) => {
  const { id } = req.params;
  const { title, content, image } = req.body;
  const updated = await News.findByIdAndUpdate(id, { title, content, image }, { new: true });
  res.json(updated);
};

// Delete news (admin only)
exports.deleteNews = async (req, res) => {
  const { id } = req.params;
  await News.findByIdAndDelete(id);
  res.json({ message: 'News deleted' });
};

// Get news by ID
exports.getNewsById = async (req, res) => {
  try {
    const news = await News.findById(req.params.id);
    if (!news) return res.status(404).json({ message: "Not found" });
    res.json(news);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};