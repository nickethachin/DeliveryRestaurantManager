const mongoose = require('mongoose');
const asyncHandler = require('express-async-handler');
const Itemset = require('../models/itemsetModel');

// @desc    Get itemsets
// @route   GET /api/itemsets
// @access  Private
const getItemsets = asyncHandler(async (req, res) => {
	const itemsets = await Itemset.find();

	res.status(200).json(itemsets);
});

// @desc    Create itemset
// @route   POST /api/itemsets
// @access  Private
const createItemset = asyncHandler(async (req, res) => {
	if (!req.body.name) {
		res.status(400);
		throw new Error("Please fill 'name' field.");
	}

	if (!req.body.items) {
		res.status(400);
		throw new Error('Must contained atleast 1 item');
	}

	if (!req.body.workCost) {
		res.status(400);
		throw new Error("Please fill 'workCost' field.");
	}

	if (!req.body.gasCost) {
		res.status(400);
		throw new Error("Please fill 'gasCost' field.");
	}

	const newItemset = new itemsetModel(req.body);
	console.log(newItemset);
	const itemset = await Itemset.create(newItemset);

	res.status(200).json(itemset);
});

// TODO: Itemset's update
// TODO: Itemset's delete

module.exports = {
	getItemsets,
	createItemset,
};
