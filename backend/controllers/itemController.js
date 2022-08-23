const asyncHandler = require('express-async-handler');
const mongoose = require('mongoose');

const Item = require('../models/itemModel');

// @desc    Get items
// @route   GET /api/items
// @access  Private
const getItems = asyncHandler(async (req, res) => {
	const items = await Item.find();

	res.status(200).json(items);
});

// @desc    Create item
// @route   POST /api/items
// @access  Private
const createItem = asyncHandler(async (req, res) => {
	if (!req.body.name) {
		res.status(400);
		throw new Error("Please fill 'name' field.");
	}

	const item = await Item.create({
		name: req.body.name,
	});
	res.status(200).json(item);
});

// @desc    Update item
// @route   PUT /api/items/:id
// @access  Private
const updateItem = asyncHandler(async (req, res) => {
	const item = await Item.findById(req.params.id);
	if (!item) {
		res.status(400);
		throw new Error('Item not found');
	}

	const missingField = (field) => {
		res.status(400);
		throw new Error(`Please fill '${field}' field`);
	};

	if (req.body.name == '') missingField('name');
	if (req.body.materials == '') missingField('materials');

	const updatedItem = await Item.findByIdAndUpdate(
		req.params.id,
		req.body,
		{
			new: true,
		}
	);
	res.status(200).json(updatedItem);
});

// @desc    Delete item
// @route   DELETE /api/items/:id
// @access  Private
const deleteItem = asyncHandler(async (req, res) => {
	const item = await Item.findById(req.params.id);
	if (!item) {
		res.status(400);
		throw new Error('Item not found');
	}
	await item.remove();
	res.status(200).json({ id: req.params.id });
});

module.exports = {
	getItems,
	createItem,
	updateItem,
	deleteItem,
};
