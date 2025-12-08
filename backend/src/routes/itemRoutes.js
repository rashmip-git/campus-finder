const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const itemCtrl = require('../controllers/item'); 
const Item = require('../models/Item');


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

router.patch('/:id/resolve', auth.protect, itemCtrl.resolveItem);


module.exports = router;
