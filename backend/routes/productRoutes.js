const express = require('express');
const router = express.Router();
const Product = require('../models/productModel');

router.post('/', async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    const saved = await newProduct.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const search = req.query.search;
    let query = {};
    if (search) {
      query = { title: { $regex: search, $options: 'i' } }; // case-insensitive search by title
    }
    const allProducts = await Product.find(query);
    res.json(allProducts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching product', error: err.message });
  }
});

// Add this DELETE route here
router.delete('/:id', async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a product by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedProduct);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add a comment to a product
router.post('/:id/comments', async (req, res) => {
  const { user, text } = req.body;
  if (!user || !text) return res.status(400).json({ message: 'Missing user or text' });
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    product.comments.push({ user, text });
    await product.save();
    res.status(201).json(product.comments);
  } catch (err) {
    res.status(500).json({ message: 'Error adding comment', error: err.message });
  }
});

// Get comments for a product
router.get('/:id/comments', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id, 'comments');
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product.comments);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching comments', error: err.message });
  }
});

// Delete a comment from a product
router.delete('/:productId/comments/:commentId', express.json(), async (req, res) => {
  try {
    const { productId, commentId } = req.params;
    const { userEmail, isAdmin } = req.body;

    // Find the product
    const product = await require('../models/productModel').findById(productId);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    // Find the comment
    const comment = product.comments.id(commentId);
    if (!comment) return res.status(404).json({ message: 'Comment not found' });

    // Check permission: admin or comment owner
    if (!isAdmin && comment.user !== userEmail) {
      return res.status(403).json({ message: 'Not authorized to delete this comment' });
    }

    // Remove the comment using pull (more robust than remove)
    product.comments.pull(commentId);
    await product.save();

    res.json(product.comments);
  } catch (err) {
    console.error("Error deleting comment:", err);
    res.status(500).json({ message: 'Error deleting comment', error: err.message });
  }
});

// Get products with pagination
router.get('/', async (req, res) => {
  try {
    const search = req.query.search;
    const page = parseInt(req.query.page) || 1;
    const limit = 32;

    let query = {};
    if (search) {
      query = { title: { $regex: search, $options: 'i' } };
    }

    const total = await Product.countDocuments(query);
    const products = await Product.find(query)
      .skip((page - 1) * limit)
      .limit(limit);

    res.json({
      products,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;
