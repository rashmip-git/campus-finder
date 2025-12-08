 const Item = require('../../models/Item');

module.exports = async (req, res, next) => {
  try {
    // Find item by ID
    const item = await Item.findById(req.params.id);

    // If item doesn't exist
    if (!item) {
      return res.status(404).json({ message: 'Item not found!' });
    }

    // Only uploader (hero) is allowed to resolve
    if (item.uploadedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: 'Access denied — Only the uploader can resolve this item.'
      });
    }

    // If already resolved
    if (item.status === "Resolved") {
      return res.status(400).json({ message: 'Item is already resolved.' });
    }

    // Mark as resolved
    item.status = "Resolved";
    await item.save();

    res.status(200).json({
      message: 'Item marked as resolved successfully.',
      item
    });

  } catch (err) {
    next(err);
  }
};
