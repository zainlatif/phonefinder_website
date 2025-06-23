const Review = require('../models/reviewModel');

// Get all reviews (public)
exports.getAllReviews = async (req, res) => {
  const reviews = await Review.find().sort({ date: -1 });
  res.json(reviews);
};

// Add review (admin only)
exports.addReview = async (req, res) => {
  const { title, paragraph, image, link } = req.body;
  const review = new Review({ title, paragraph, image, link });
  await review.save();
  res.json(review);
};

// Update review (admin only)
exports.updateReview = async (req, res) => {
  const { id } = req.params;
  const { title, paragraph, image, link } = req.body;
  const updated = await Review.findByIdAndUpdate(
    id,
    { title, paragraph, image, link },
    { new: true }
  );
  res.json(updated);
};

// Delete review (admin only)
exports.deleteReview = async (req, res) => {
  const { id } = req.params;
  await Review.findByIdAndDelete(id);
  res.json({ message: 'Review deleted' });
};