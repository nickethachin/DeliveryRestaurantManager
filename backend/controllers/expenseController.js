const asyncHandler = require('express-async-handler');
const ExpenseCategory = require('../models/expenseCategoryModel');
const Expense = require('../models/expenseModel');

// *----------------------------------------------------

const responseError = (res, error) => {
	res.status(400);
	throw new Error(error);
};

// *----------------------------------------------------

// @desc    Get expense categories
// @route   GET /api/expense/category
// @access  Private
const getCategories = asyncHandler(async (req, res) => {
	try {
		const categories = await ExpenseCategory.find();
		res.status(200).json(categories);
	} catch (error) {
		responseError(res, error);
	}
});

// @desc    Create expense category
// @route   POST /api/expense/category
// @access  Private
const createCategory = asyncHandler(async (req, res) => {
	if (!req.body.name) {
		res.status(400);
		throw new Error('Please fill name field');
	}

	try {
		const category = await ExpenseCategory.create({
			name: req.body.name,
			parent: req.body.parent,
		});
	} catch (error) {
		responseError(res, error);
	}
});

// @desc    Update expense category
// @route   PUT /api/expense/category/:id
// @access  Private
const updateCategory = asyncHandler(async (req, res) => {
	const category = await ExpenseCategory.findById(
		req.params.id
	);
	if (!category) {
		res.status(400);
		throw new Error('Category not found');
	}

	if (req.body.name == '') {
		res.status(400);
		throw new Error('Please fill name field');
	}

	try {
		const updatedCategory =
			await ExpenseCategory.findByIdAndUpdate(
				req.params.id,
				req.body,
				{
					new: true,
				}
			);
		res.status(200).json(updatedCategory);
	} catch (error) {
		responseError(res, error);
	}
});

// @desc    Delete expense category
// @route   DELETE /api/expense/category/:id
// @access  Private
const deleteCategory = asyncHandler(async (req, res) => {
	const category = await ExpenseCategory.findById(
		req.params.id
	);
	if (!category) {
		res.status(400);
		throw new Error('Category not found');
	}
	try {
		await category.remove();
		res.status(200).json({ id: req.params.id });
	} catch (error) {
		responseError(res, error);
	}
});

// *-----------------------------------------------------

// @desc    Get category
// @route   GET /api/expense/
// @access  Private
const getExpenses = asyncHandler(async (req, res) => {
	try {
		const expenses = await Expense.find();
		res.status(200).json(expenses);
	} catch (error) {
		responseError(res, error);
	}
});

// @desc    Create category
// @route   POST /api/expense/
// @access  Private
const createExpenses = asyncHandler(async (req, res) => {
	if (req.body.materials == '') {
		res.status(400);
		throw new Error('Please fill materials field(s)');
	}

	try {
		const expense = await Expense.create({
			name: req.body.name,
			materials: req.body.materials,
		});
	} catch (error) {
		responseError(res, error);
	}
});

// @desc    Update category
// @route   PUT /api/expense/:id
// @access  Private
const updateExpenses = asyncHandler(async (req, res) => {
	const expense = await Expense.findById(req.params.id);
	if (!expense) {
		res.status(400);
		throw new Error('Expense not found');
	}

	if (req.body.materials == '') {
		res.status(400);
		throw new Error('Please fill materials field(s)');
	}

	try {
		const updatedExpense = await Expense.findByIdAndUpdate(
			req.params.id,
			req.body,
			{
				new: true,
			}
		);
		res.status(200).json(updatedExpense);
	} catch (error) {
		responseError(res, error);
	}
});

// @desc    Delete category
// @route   DELETE /api/expense/:id
// @access  Private
const deleteExpenses = asyncHandler(async (req, res) => {
	const expense = await Expense.findById(req.params.id);
	if (!expense) {
		res.status(400);
		throw new Error('Expense not found');
	}

	try {
		expense.remove();
		res.status(200).json({ id: req.params.id });
	} catch (error) {
		responseError(res, error);
	}
});

module.exports = {
	getCategories,
	createCategory,
	updateCategory,
	deleteCategory,
	getExpenses,
	createExpenses,
	updateExpenses,
	deleteExpenses,
};
