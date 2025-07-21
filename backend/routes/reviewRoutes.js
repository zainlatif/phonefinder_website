const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');

// Public: get all reviews
router.get('/', reviewController.getAllReviews);

// Public: get a single review by ID
router.get('/:id', reviewController.getReviewById);

// Admin: add, update, delete reviews
router.post('/', reviewController.addReview);
router.put('/:id', reviewController.updateReview);
router.delete('/:id', reviewController.deleteReview);

module.exports = router;