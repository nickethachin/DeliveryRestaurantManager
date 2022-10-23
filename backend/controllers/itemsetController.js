const mongoose = require('mongoose');
const asyncHandler = require('express-async-handler');
const Itemset = require('../models/itemsetModel');

// @desc    Get itemsets
// @route   GET /api/itemsets
// @access  Private
const getItemsets = asyncHandler(async (req, res) => {
	const itemsets = await Itemset.find();
	//strictPopulate
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
	const newItemset = new Itemset(req.body);
	try {
		const itemset = await Itemset.create(newItemset);
		res.status(200).json(itemset);
	} catch (error) {
		res.status(500);
		throw new Error(error);
	}
});

// @desc    Update itemset
// @route   PUT /api/itemsets/:id
// @access  Private
const updateItemset = asyncHandler(async (req, res) => {
	const itemset = await Itemset.findById(req.params.id);
	if (!itemset) {
		res.status(400);
		throw new Error('Itemset not found');
	}

	const missingField = (field) => {
		res.status(400);
		throw new Error(`Please fill '${field}' field`);
	};

	if (req.body.name == '') missingField('name');
	if (req.body.items == '') missingField('items');
	if (req.body.workCost == '') missingField('workCost');
	if (req.body.gasCost == '') missingField('gasCost');

	const updatedItemset = await Itemset.findByIdAndUpdate(
		req.params.id,
		req.body,
		{
			new: true,
		}
	);
	res.status(200).json(updatedItemset);
});

// @desc    Delete itemset
// @route   DELETE /api/itemset/:id
// @access  Private
const deleteItemset = asyncHandler(async (req, res) => {
	const itemset = await Itemset.findById(req.params.id);
	if (!itemset) {
		res.status(400);
		throw new Error('Itemset not found');
	}
	await itemset.remove();
	res.status(200).json({ id: req.params.id });
});

module.exports = {
	getItemsets,
	createItemset,
	updateItemset,
	deleteItemset,
};
