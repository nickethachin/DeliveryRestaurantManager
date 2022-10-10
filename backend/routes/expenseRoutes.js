const express = require('express');
const router = express.Router();
const {
	getExpenses,
	createExpenses,
	updateExpenses,
	deleteExpenses,
	getCategories,
	createCategory,
	updateCategory,
	deleteCategory,
} = require('../controllers/expenseController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(protect, getExpenses);
router.route('/').post(protect, createExpenses);
router.route('/:id').put(protect, updateExpenses);
router.route('/:id').delete(protect, deleteExpenses);

router.route('/categories/').get(protect, getCategories);
router.route('/categories/').post(protect, createCategory);
router
	.route('/categories/:id')
	.put(protect, updateCategory);
router
	.route('/categories/:id')
	.delete(protect, deleteCategory);

module.exports = router;
