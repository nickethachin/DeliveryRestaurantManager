const express = require('express');
const router = express.Router();
const {
	getOrders,
	getIngredientTotals,
	createOrder,
	deleteOrder,
} = require('../controllers/orderController');

const { protect } = require('../middleware/authMiddleware');

router
	.route('/')
	.get(protect, getOrders)
	.post(protect, createOrder);

router.route('/:id').delete(protect, deleteOrder);
// 	.put(protect, updateOrder);

router.route('/totals').get(protect, getIngredientTotals);

module.exports = router;
