const mongoose = require('mongoose');

const expenseCategorySchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, 'Please add a category name'],
			unique: true,
		},
		parent: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'ExpenseCategory',
		},
		children: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'ExpenseCategory',
			},
		],
	},
	{ timestamps: true }
);
module.exports = mongoose.model(
	'ExpenseCategory',
	expenseCategorySchema
);
