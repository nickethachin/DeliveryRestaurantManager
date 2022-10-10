const mongoose = require('mongoose');

const expenseSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, 'Please specify order name'],
		},
		matId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Material',
		},
		category: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'ExpenseCategory',
			required: [true, 'Please specify expense category'],
		},
		amount: {
			type: Number,
			required: [true, 'Please specify item amount'],
		},
		total: {
			type: Number,
			required: [true, 'Please specify total cost'],
		},
		date: { type: Date, default: Date.now },
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('Expense', expenseSchema);
