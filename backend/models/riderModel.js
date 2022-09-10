const mongoose = require('mongoose');

const riderSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, 'Please add a name'],
			unique: true,
		},
		fees: {
			type: Number,
			required: [true, "Please specify rider's fees"],
		},
		tax: {
			type: Number,
			required: [true, "Please specify rider's tax"],
		},
		gasCost: {
			type: Number,
			required: false,
		},
		price: [
			{
				itemset: {
					type: mongoose.Schema.Types.ObjectId,
					ref: 'Itemset',
				},
				amount: Number,
			},
		],
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('Rider', riderSchema);
