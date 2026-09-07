const jwt = require('jsonwebtoken');

const getJwtSecret = () => {
  if (!process.env.JWT_SECRET || process.env.JWT_SECRET.length < 32) {
    throw new Error('JWT_SECRET must be set and contain at least 32 characters');
  }
  return process.env.JWT_SECRET;
};

const signToken = (user) => jwt.sign(
  { sub: user._id.toString(), email: user.email, role: user.role },
  getJwtSecret(),
  { expiresIn: process.env.JWT_EXPIRES_IN || '15m', issuer: 'phonefinder-api', audience: 'phonefinder-client' }
);

const requireAuth = (req, res, next) => {
  const authorization = req.get('authorization') || '';
  const [scheme, token] = authorization.split(' ');

  if (scheme !== 'Bearer' || !token) {
    return res.status(401).json({ message: 'Authentication required' });
  }

  try {
    req.auth = jwt.verify(token, getJwtSecret(), {
      issuer: 'phonefinder-api',
      audience: 'phonefinder-client'
    });
    next();
  } catch {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

module.exports = { getJwtSecret, signToken, requireAuth };
