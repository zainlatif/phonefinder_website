const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const { signToken } = require('../middleware/authMiddleware');

const normalizeEmail = (email = '') => email.trim().toLowerCase();
const publicUser = (user) => ({
  id: user._id,
  email: user.email,
  role: user.role,
  name: user.name,
  address: user.address,
  phone: user.phone,
  favorites: user.favorites
});

const assertOwnEmail = (req, res) => {
  if (normalizeEmail(req.params.email) !== normalizeEmail(req.auth.email)) {
    res.status(403).json({ message: 'You can only access your own account' });
    return false;
  }
  return true;
};

exports.signupUser = async (req, res) => {
  const email = normalizeEmail(req.body.email);
  const { password, name, address, phone } = req.body;

  if (!email || !password || password.length < 12) {
    return res.status(400).json({ message: 'Email and a password of at least 12 characters are required' });
  }

  try {
    const passwordHash = await bcrypt.hash(password, 12);
    const newUser = await User.create({ email, password: passwordHash, name, address, phone });
    res.status(201).json({ message: 'User registered successfully', user: publicUser(newUser) });
  } catch (error) {
    if (error.code === 11000) return res.status(409).json({ message: 'An account with this email already exists' });
    res.status(500).json({ message: 'Signup failed' });
  }
};

exports.getUserByEmail = async (req, res) => {
  if (!assertOwnEmail(req, res)) return;
  try {
    const user = await User.findOne({ email: normalizeEmail(req.params.email) });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(publicUser(user));
  } catch (err) {
    res.status(500).json({ message: 'Error fetching user' });
  }
};

exports.updateUser = async (req, res) => {
  if (!assertOwnEmail(req, res)) return;
  const { name, address, phone } = req.body;
  try {
    const user = await User.findOneAndUpdate(
      { email: normalizeEmail(req.params.email) },
      { name, address, phone },
      { new: true, runValidators: true }
    );
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(publicUser(user));
  } catch (err) {
    res.status(500).json({ message: 'Error updating user' });
  }
};

exports.deleteUser = async (req, res) => {
  if (!assertOwnEmail(req, res)) return;
  try {
    const user = await User.findOneAndDelete({ email: normalizeEmail(req.params.email) });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting user' });
  }
};

exports.addFavorite = async (req, res) => {
  if (!assertOwnEmail(req, res)) return;
  const { productId } = req.body;
  if (!productId) return res.status(400).json({ message: 'productId is required' });

  try {
    const user = await User.findOne({ email: normalizeEmail(req.params.email) });
    if (!user) return res.status(404).json({ message: 'User not found' });
    if (!user.favorites.some((favorite) => favorite.toString() === productId)) {
      user.favorites.push(productId);
      await user.save();
    }
    res.json({ message: 'Favorite added' });
  } catch (err) {
    res.status(500).json({ message: 'Error saving favorite' });
  }
};

exports.removeFavorite = async (req, res) => {
  if (!assertOwnEmail(req, res)) return;
  const { productId } = req.body;
  if (!productId) return res.status(400).json({ message: 'productId is required' });

  try {
    const user = await User.findOne({ email: normalizeEmail(req.params.email) });
    if (!user) return res.status(404).json({ message: 'User not found' });
    user.favorites = user.favorites.filter((favorite) => favorite.toString() !== productId);
    await user.save();
    res.json({ message: 'Favorite removed' });
  } catch (err) {
    res.status(500).json({ message: 'Error removing favorite' });
  }
};

exports.loginUser = async (req, res) => {
  const email = normalizeEmail(req.body.email);
  const { password } = req.body;
  if (!email || !password) return res.status(400).json({ message: 'Email and password are required' });

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(401).json({ message: 'Invalid credentials' });

    res.json({ token: signToken(user), user: publicUser(user) });
  } catch (err) {
    res.status(500).json({ message: 'Login failed' });
  }
};
