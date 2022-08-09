const asyncHandler = require('express-async-handler');

const Rider = require('../models/RiderModel');

// @desc    Get riders
// @route   GET /api/riders
// @access  Private
const getRiders = asyncHandler(async (req, res) => {
	if (req.query.withprice != null) {
		console.log('get rider with price');
		const riders = await Rider.find().populate(
			'price.itemset'
		);
		res.status(200).json(riders);
	} else {
		console.log('get rider default');
		const riders = await Rider.find();
		res.status(200).json(riders);
	}
});

// @desc    Create rider
// @route   POST /api/riders
// @access  Private
const createRider = asyncHandler(async (req, res) => {
	if (!req.body.name) {
		res.status(400);
		throw new Error("Please fill 'name' field.");
	}
	if (!req.body.fees) {
		res.status(400);
		throw new Error("Please fill 'fees' field.");
	}
	if (!req.body.tax) {
		res.status(400);
		throw new Error("Please fill 'tax' field.");
	}

	const rider = await Rider.create({
		name: req.body.name,
		fees: req.body.fees,
		tax: req.body.tax,
		gasCost: req.body.gas,
	});
	res.status(200).json(rider);
});

// TODO: Rider's update

// @desc    Delete rider
// @route   DELETE /api/riders/:id
// @access  Private
const deleteRider = asyncHandler(async (req, res) => {
	const rider = await Rider.findById(req.params.id);

	if (!rider) {
		res.status(400);
		throw new Error('Rider not found');
	}

	await rider.remove();

	res.status(200).json({ id: req.params.id });
});

// @desc    Update Price
// @route   POST /api/riders/price
// @access  Private
const updatePrice = asyncHandler(async (req, res) => {
	if (!req.body.rider) {
		res.status(400);
		throw new Error("Please fill 'rider' field.");
	}
	if (!req.body.itemset) {
		res.status(400);
		throw new Error("Please fill 'itemset' field.");
	}
	if (!req.body.amount) {
		res.status(400);
		throw new Error("Please fill 'amount' field.");
	}

	let rider = await Rider.findByIdAndUpdate(
		req.body.rider,
		{
			$pull: {
				price: { itemset: req.body.itemset },
			},
		},
		{
			new: true,
		}
	);

	rider = await Rider.findByIdAndUpdate(
		req.body.rider,
		{
			$push: {
				price: {
					itemset: req.body.itemset,
					amount: req.body.amount,
				},
			},
		},
		{
			new: true,
		}
	);
	res.status(200).json(rider);
});

module.exports = {
	getRiders,
	createRider,
	deleteRider,
	updatePrice,
};
