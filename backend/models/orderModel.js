const mongoose = require('mongoose');

const orderSchema = mongoose.Schema(
	{
		rider: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Rider',
			required: true,
		},
		details: [
			{
				itemset: {
					type: mongoose.Schema.Types.ObjectId,
					ref: 'Itemset',
					required: true,
				},
				amount: Number,
			},
		],
		date: { type: Date, default: Date.now },
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);
