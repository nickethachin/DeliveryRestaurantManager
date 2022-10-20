const asyncHandler = require('express-async-handler');
const Order = require('../models/orderModel');

const calculateCost = (prices, itemsetId, amount) => {
	const priceEach = prices.find(
		(price) =>
			price.itemset.toString() === itemsetId.toString()
	).amount;
	const cost = priceEach * amount;
	return cost;
};

// @desc    Get orders
// @route   GET /api/orders
// @access  Private
const getOrders = asyncHandler(async (req, res) => {
	const orders = await Order.find()
		.populate('rider')
		.populate({
			path: 'details.itemset',
			populate: {
				path: 'items.itemId',
				// populate: { path: 'materials.matId' },
			},
		});

	const calculatedOrders = orders.map((order) => {
		const {
			_id,
			rider,
			details,
			createdAt,
			updatedAt,
			date,
		} = order;
		const newDetails = details.map((detail) => {
			const { itemset, amount } = detail;
			return {
				itemset,
				amount,
				total: calculateCost(
					rider.price,
					itemset._id,
					amount
				),
			};
		});
		return {
			_id,
			rider,
			details: newDetails,
			total: newDetails.reduce(
				(total, { total: price }) => (total += price),
				0
			),
			date,
			createdAt,
			updatedAt,
		};
	});
	res.status(200).json(calculatedOrders);
});

// @desc    Create orders
// @route   POST /api/orders
// @access  Private
const createOrder = asyncHandler(async (req, res) => {
	const missingField = (field) => {
		res.status(400);
		throw new Error(`Please fill '${field}' field`);
	};
	if (!req.body.rider) missingField('rider');
	if (!req.body.details) missingField('details');

	try {
		const { rider, details, date } = req.body;
		console.log(date);
		const createdOrder = await Order.create({
			rider,
			details,
			date,
		});
		const order = await Order.findById(createdOrder._id)
			.populate('rider')
			.populate('details.itemset');
		const newDetails = order.details.map((item) => {
			return {
				itemset: item.itemset,
				amount: item.amount,
				total: calculateCost(
					order.rider.price,
					item.itemset._id,
					item.amount
				),
			};
		});
		const orderWithTotal = {
			_id: order._id,
			rider: order.rider,
			details: newDetails,
			total: newDetails.reduce(
				(total, { total: price }) => (total += price),
				0
			),
			date: order.date,
			createdAt: order.createdAt,
			updatedAt: order.updatedAt,
		};
		res.status(200).json(orderWithTotal);
	} catch (error) {
		throw new Error(error);
	}
});

// @desc    Delete order
// @route   DELETE /api/orders/:id
// @access  Private
const deleteOrder = asyncHandler(async (req, res) => {
	const order = await Order.findById(req.params.id);
	if (!order) {
		res.status(400);
		throw new Error('Order not found');
	}

	try {
		order.remove();
		res.status(200).json({ id: req.params.id });
	} catch (error) {
		responseError(res, error);
	}
});
module.exports = {
	getOrders,
	createOrder,
	deleteOrder,
};
