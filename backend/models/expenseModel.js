const mongoose = require('mongoose');

const expenseSchema = mongoose.Schema(
	{
		materials: [
			{
				category: {
					type: mongoose.Schema.Types.ObjectId,
					ref: 'ExpenseCategory',
				},
				materials: [
					{
						matId: {
							type: mongoose.Schema.Types.ObjectId,
							ref: 'Material',
							required: [
								true,
								'Please specify material id',
							],
						},
						quantity: {
							type: Number,
							required: [
								true,
								'Please specify item quantity',
							],
						},
						cost: {
							type: Number,
							required: [true, 'Please specify item cost'],
						},
					},
				],
			},
		],
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('Expense', expenseSchema);
