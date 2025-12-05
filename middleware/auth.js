const jwt = require('jsonwebtoken');
const User = require('../model/User');

// Middleware to protect routes and require authentication
const protect = async (req, res, next) => {
  let token;

  // Check if the authorization header exists and starts with 'Bearer'
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    // Extract the token from the header
    token = req.headers.authorization.split(' ')[1];
  }

  // If no token is provided, return 401 Unauthorized
  if (!token) {
    return res.status(401).json({ message: 'Access denied, no token provided' });
  }

  try {
    // Verify the token using JWT_SECRET
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Find the user by ID from the decoded token and exclude the password
    req.user = await User.findById(decoded.id).select('-password');
    // Call next middleware if everything is fine
    next();
  } catch (err) {
    // If token is invalid or expired, return 401 Unauthorized
    return res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = { protect };
