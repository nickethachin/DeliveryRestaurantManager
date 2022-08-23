const express = require('express');
const router = express.Router();
const {
	getItems,
	createItem,
	updateItem,
	deleteItem,
} = require('../controllers/itemController');

const { protect } = require('../middleware/authMiddleware');

router.route('/').get(protect, getItems);
router.route('/').post(protect, createItem);
// TODO: Item's update routes
router.route('/:id').put(protect, updateItem);
router.route('/:id').delete(protect, deleteItem);

module.exports = router;
