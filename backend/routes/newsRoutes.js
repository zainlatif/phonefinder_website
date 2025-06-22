const express = require('express');
const router = express.Router();
const newsController = require('../controllers/newsController');

// Public: get all news
router.get('/', newsController.getAllNews);

// Admin: add, update, delete news
router.post('/', newsController.addNews);
router.put('/:id', newsController.updateNews);
router.delete('/:id', newsController.deleteNews);

module.exports = router;