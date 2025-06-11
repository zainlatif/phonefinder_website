const User = require('../models/userModel');

exports.signupUser = async (req, res) => {
  const { email, password, name, address, phone } = req.body;
  try {
    const newUser = new User({ email, password, name, address, phone });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Signup failed', error });
  }
};

exports.getUserByEmail = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching user', error: err.message });
  }
};

exports.updateUser = async (req, res) => {
  const { name, address, phone } = req.body;
  try {
    const user = await User.findOneAndUpdate(
      { email: req.params.email },
      { name, address, phone },
      { new: true }
    );
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Error updating user', error: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findOneAndDelete({ email: req.params.email });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting user', error: err.message });
  }
};

exports.addFavorite = async (req, res) => {
  const { productId } = req.body;          // passed from the client
  const  email        = req.params.email;  // `/favorite/:email`

  try {
    // 1) basic checks
    const user    = await User.findOne({ email });
    if (!user)       return res.status(404).json({ message: 'User not found' });
    const product = await Product.findById(productId);
    if (!product)    return res.status(404).json({ message: 'Product not found' });

    // 2) avoid duplicates
    if (!user.favorites.includes(productId)) {
      user.favorites.push(productId);
      await user.save();
    }

    res.json({ message: 'Added to favourites ✅' });
  } catch (err) {
    res.status(500).json({ message: 'Error adding favourite', error: err.message });
  }
};

// userController.js
exports.addFavorite = async (req, res) => {
  const { email } = req.params;
  const { productId } = req.body;

  if (!email || !productId) {
    return res.status(400).json({ message: 'Missing email or productId' });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ message: 'User not found' });

    // Prevent duplicate favorites
    if (user.favorites && user.favorites.includes(productId)) {
      return res.status(200).json({ message: 'Product already in favorites' });
    }

    user.favorites.push(productId);
    await user.save();

    res.status(200).json({ message: 'Favorite added' });
  } catch (err) {
    res.status(500).json({ message: 'Error saving favorite', error: err.message });
  }
};

exports.removeFavorite = async (req, res) => {
  const { email } = req.params;
  const { productId } = req.body;

  if (!email || !productId) {
    return res.status(400).json({ message: 'Missing email or productId' });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.favorites = user.favorites.filter(
      (favId) => favId.toString() !== productId
    );
    await user.save();

    res.status(200).json({ message: 'Favorite removed' });
  } catch (err) {
    res.status(500).json({ message: 'Error removing favorite', error: err.message });
  }
};
