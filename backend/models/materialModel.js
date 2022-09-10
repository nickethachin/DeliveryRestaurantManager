const mongoose = require('mongoose');

const materialSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, 'Please add a name'],
			unique: true,
		},
		type: {
			type: String,
			required: [true, 'Please add material type'],
		},
		unit: {
			type: String,
			required: [true, 'Please specify material unit'],
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Material', materialSchema);
