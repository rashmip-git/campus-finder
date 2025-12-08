const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const itemCtrl = require('../controllers/item'); 
const Item = require('../models/Item');// <-- loads index.js automatically
//console.log("DEBUG BOOK CONTROLLERS:", bookCtrl);

// ---------- PUBLIC ----------
router.get('/', itemCtrl.getAllItems);         // Search & view list
router.get('/category/:category',itemCtrl.getItemsByCategory);
router.get('/stats/resolved', async (req, res) => {
  try {
    const count = await Item.countDocuments({ status: "Resolved" });
    res.json({ totalResolved: count });
  } catch (err) {
    res.status(500).json({ message: "Error fetching resolved items count" });
  }
});

router.get('/:id',  itemCtrl.getItemsById);

router.post('/', auth.protect, auth.restrictTo('admin','user'), itemCtrl.createItem);
//router.put('/:id', auth.protect, auth.restrictTo('admin'), bookCtrl.updateBook);
router.patch('/:id/resolve', auth.protect, itemCtrl.resolveItem);


// ---------- CUSTOMER & ADMIN (Must be logged in) ----------
//router.post('/:id/borrow', auth.protect, auth.restrictTo('customer', 'admin'), bookCtrl.borrowBook);
//router.post('/:id/buy', auth.protect, auth.restrictTo('customer', 'admin'), bookCtrl.buyBook);
//router.get('/borrowed', auth.protect, auth.restrictTo('admin'), bookCtrl.getBorrowedBooks);




// Return book (customer uses borrow code)
//router.post('/return/by-code', auth.protect, auth.restrictTo('customer', 'admin'), bookCtrl.returnBook);

module.exports = router;
