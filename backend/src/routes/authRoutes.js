const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const authCtrl = require('../controllers/authController');
const { protect, restrictTo } = require('../middleware/auth');
const User = require('../models/User')  


router.post(
  '/signup',
  [
    check('username').notEmpty().withMessage('Username required'),
    check('email').isEmail().withMessage('Valid email required'),
    check('password').isLength({ min: 8 }).withMessage('Min 8 characters required'),
    check('role').optional().isIn(['admin', 'user'])
  ],
  authCtrl.signup
);


router.post('/login', authCtrl.login);

// 🔐 Protected route (any logged-in user)
router.get('/profile', protect, (req, res) => {
  res.json({
    message: "Authenticated successfully",
    user: req.user
  });
});

// 🛑 Admin-only route
router.get('/admin-only', protect, restrictTo('admin'), (req, res) => {
  res.json({
    message: "Admin access granted",
    user: req.user
  });
});

router.get('/count', async (req, res) => {
  try {
    const total = await User.countDocuments();
    res.json({ total });
  } catch (err) {
    res.status(500).json({ message: "Error fetching user count" });
  }
});


module.exports = router;
