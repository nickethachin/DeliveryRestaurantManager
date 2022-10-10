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
// @route   GET /api/expenses/categories
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
// @route   POST /api/expenses/categories
// @access  Private
const createCategory = asyncHandler(async (req, res) => {
	// Check for name
	if (!req.body.name) {
		res.status(400);
		throw new Error('Please fill name field');
	}
	let parent = undefined;
	if (req.body.parent) {
		// Check if parent exist
		parent = await ExpenseCategory.findById(
			req.body.parent
		);
		if (!parent) {
			res.status(400);
			throw new Error('Parent not found');
		}
	}
	// Create new category and add their _id
	// to parent if parent was founded
	try {
		const category = await ExpenseCategory.create({
			name: req.body.name,
			parent: req.body.parent ? req.body.parent : null,
		});
		if (parent) {
			parent.children.push(category._id);
			parent.save((error) => {
				if (error) responseError(res, error);
			});
		}
		res.status(200).send(category);
	} catch (error) {
		responseError(res, error);
	}
});

// @desc    Update expense category
// @route   PUT /api/expenses/categories/:id
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
	const parentChanged = category.parent !== req.body.parent;
	const wasParent = category.parent !== null;
	if (parentChanged) {
		if (wasParent) {
			// Remove from old parent children list
			const parent = await ExpenseCategory.findById(
				category.parent
			);
			parent.children = parent.children.filter(
				(child) => child !== category._id
			);
			parent.save((error) => {
				if (error) responseError(res, error);
			});
			category.children = [];
		}
		// Add to new parent
		const parent = await ExpenseCategory.findById(
			req.body.parent
		);
		parent.children.push(category._id);
		parent.save((error) => {
			if (error) responseError(res, error);
		});
	}
	category.name = req.body.name;
	category.parent = req.body.parent;
	category.save((error) => {
		if (error) responseError(res, error);
	});
	res.status(200).send(category);

	// //-----------------
	// const categoryWasParent = category.parent !== null;
	// const getParent = async (parentId) => {
	// 	try {
	// 		return await ExpenseCategory.findById(parentId);
	// 	} catch (error) {
	// 		responseError(res, error);
	// 	}
	// };
	// //-----------------
	// const addToParent = async (parentId) => {
	// 	try {
	// 		const parent = await getParent(parentId);
	// 		parent.children.push(category._id);
	// 		parent.save();
	// 	} catch (error) {
	// 		responseError(res, error);
	// 	}
	// };
	// const removeFromParent = async (parentId) => {
	// 	try {
	// 		const parent = await getParent(parentId);
	// 		parent.children = parent.children.filter((child) => {
	// 			child !== category._id;
	// 		});
	// 		parent.save();
	// 	} catch (error) {
	// 		responseError(res, error);
	// 	}
	// };
	// const saveCategory = async () => {
	// 	try {
	// 		const updatedCategory =
	// 			await ExpenseCategory.findByIdAndUpdate(
	// 				req.params.id,
	// 				req.body,
	// 				{
	// 					new: true,
	// 				}
	// 			);
	// 		res.status(200).json(updatedCategory);
	// 	} catch (error) {
	// 		responseError(res, error);
	// 	}
	// };
	// //-----------------
	// if (req.body.parent !== null) {
	// 	if (categoryWasParent) {
	// 		await addToParent(req.body.parent);
	// 		saveCategory();
	// 	} else {
	// 		await removeFromParent(req.body.parent);
	// 		await addToParent(req.body.parent);
	// 		saveCategory();
	// 	}
	// } else {
	// 	if (categoryWasParent) {
	// 		saveCategory();
	// 	} else {
	// 		await removeFromParent(req.body.parent);
	// 		saveCategory();
	// 	}
	// }
});

// @desc    Delete expense category
// @route   DELETE /api/expenses/categories/:id
// @access  Private
const deleteCategory = asyncHandler(async (req, res) => {
	const category = await ExpenseCategory.findById(
		req.params.id
	);
	if (!category) {
		res.status(400);
		throw new Error('Category not found');
	}
	const removedId = [];
	const isParent = category.parent === null;
	if (isParent) {
		category.children.forEach(async (child) => {
			const subCategory = await ExpenseCategory.findById(
				child
			);
			try {
				removedId.push(subCategory._id);
				await subCategory.remove();
			} catch (error) {
				throw new Error(error);
			}
		});
		try {
			removedId.push(category._id);
			await category.remove();
		} catch (error) {
			throw new Error(error);
		}
		res.status(200).json({ id: removedId });
	} else {
		//Remove category from parent's children list
		const parentCategory = await ExpenseCategory.findById(
			category.parent
		);
		try {
			parentCategory.children =
				parentCategory.children.filter(
					(child) =>
						child.toString() !== category._id.toString()
				);
			await parentCategory.save();
		} catch (error) {
			throw new Error(error);
		}
		//Remove category from database
		try {
			await category.remove();
		} catch (error) {
			throw new Error(error);
		}
		res.status(200).json({
			id: req.params.id,
			parent: parentCategory._id,
		});
	}
});

// *-----------------------------------------------------

// @desc    Get expenses
// @route   GET /api/expenses/categories
// @access  Private
const getExpenses = asyncHandler(async (req, res) => {
	try {
		const expenses = await Expense.find()
			.populate('category')
			.populate('matId');
		res.status(200).json(expenses);
	} catch (error) {
		responseError(res, error);
	}
});

// @desc    Create expense
// @route   POST /api/expenses/categories
// @access  Private
const createExpenses = asyncHandler(async (req, res) => {
	const { name, matId, category, amount, total, date } =
		req.body;
	const missingField = (field) => {
		res.status(400);
		throw new Error(`Please fill ${field} field`);
	};
	if (name == '') missingField(name);
	if (category == '') missingField(category);
	if (amount == '') missingField(name);
	if (total == '') missingField(total);

	try {
		const expense = await Expense.create({
			name,
			matId,
			category,
			amount,
			total,
			date,
		});
		res.status(200).send(expense);
	} catch (error) {
		responseError(res, error);
	}
});

// @desc    Update expense
// @route   PUT /api/expenses/categories/:id
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

// @desc    Delete expense
// @route   DELETE /api/expenses/categories/:id
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
