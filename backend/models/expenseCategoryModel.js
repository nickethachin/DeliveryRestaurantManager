const mongoose = require('mongoose');

const expenseCategorySchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, 'Please add a category name'],
		},
		parent: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'ExpenseCategory',
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model(
	'ExpenseCategory',
	expenseCategorySchema
);
