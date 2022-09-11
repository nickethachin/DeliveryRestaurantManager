const mongoose = require('mongoose');

const itemsetSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, 'Please add a name'],
		},
		items: [
			{
				itemId: {
					type: mongoose.Schema.Types.ObjectId,
					ref: 'Material',
					required: [true, 'Please specify item id'],
				},
				amount: Number,
			},
		],
		workCost: {
			type: Number,
			required: [true, 'Please specify work cost (%)'],
		},
		gasCost: {
			type: Number,
			required: [true, 'Please sepcify gas cost'],
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('Itemset', itemsetSchema);
