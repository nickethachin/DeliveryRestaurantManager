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
				usage: {
					type: Number,
					default: 0,
				},
				output: {
					type: Number,
					default: 0,
				},
				amount: {
					type: Number,
					default: () => {
						const calAmount = this.usage / this.output;
						if (isFinite(calAmount)) {
							return calAmount;
						} else {
							return 0;
						}
					},
				},
			},
		],
	},
	{
		timestamps: true,
	}
);

itemSchema.pre('findOneAndUpdate', function (next) {
	this.materials.forEach((material) => {
		const calAmount = material.usage / material.output;
		if (isFinite(calAmount)) {
			material.amount = calAmount;
		}
	});
	next();
});

module.exports = mongoose.model('Item', itemSchema);
