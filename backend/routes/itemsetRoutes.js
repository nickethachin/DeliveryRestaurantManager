const express = require('express');
const router = express.Router();
const {
	getItemsets,
	createItemset,
	updateItemset,
	deleteItemset,
} = require('../controllers/itemsetController');

const { protect } = require('../middleware/authMiddleware');

router
	.route('/')
	.get(protect, getItemsets)
	.post(protect, createItemset);
router
	.route('/:id')
	.put(protect, updateItemset)
	.delete(protect, deleteItemset);

module.exports = router;
