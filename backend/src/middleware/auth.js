//This middleware protects routes and restricts based on role
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Protect: User must be logged in
exports.protect = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token){
        return res.status(401).json({ message: 'Login required' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);
    if (!user) return res.status(401).json({ message: 'User not found or removed' });
    req.user = user; // attach logged-in user info
    next();
  } 

  catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

// Restrict access based on role(s)
exports.restrictTo = (...allowedRoles) => {
  return (req, res, next) => {
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Access denied: Not authorized' });
    }
    next();
  };
};
