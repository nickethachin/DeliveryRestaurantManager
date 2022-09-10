const mongoose = require('mongoose');

const itemSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, 'Please add a name'],
		},
		materials: [
			{
				matId: {
					type: mongoose.Schema.Types.ObjectId,
					ref: 'Material',
					required: [true, 'Please specify material id'],
				},
				amount: Number,
			},
		],
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('Item', itemSchema);
