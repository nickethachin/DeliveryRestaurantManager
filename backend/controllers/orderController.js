const asyncHandler = require('express-async-handler');
const Order = require('../models/orderModel');
const { ObjectId } = require('mongodb');

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

const getIngredientTotals = asyncHandler(
	async (req, res) => {
		const agg = [
			{
				$match: {
					rider: new ObjectId(req.query.riderId),
					date: {
						$gte: new Date(req.query.startDate),
					},
				},
			},
			{
				$unwind: {
					path: '$details',
				},
			},
			{
				$lookup: {
					from: 'itemsets',
					localField: 'details.itemset',
					foreignField: '_id',
					as: 'itemset',
				},
			},
			{
				$project: {
					_id: 1,
					rider: 1,
					itemset: {
						$arrayElemAt: ['$itemset', 0],
					},
					itemsetAmount: '$details.amount',
				},
			},
			{
				$unwind: {
					path: '$itemset.items',
				},
			},
			{
				$lookup: {
					from: 'items',
					localField: 'itemset.items.itemId',
					foreignField: '_id',
					as: 'item',
				},
			},
			{
				$project: {
					itemsetAmount: 1,
					item: {
						$arrayElemAt: ['$item', 0],
					},
				},
			},
			{
				$unwind: {
					path: '$item.materials',
				},
			},
			{
				$lookup: {
					from: 'materials',
					localField: 'item.materials.matId',
					foreignField: '_id',
					as: 'material',
				},
			},
			{
				$project: {
					amount: {
						$multiply: [
							'$item.materials.amount',
							'$itemsetAmount',
						],
					},
					material: {
						$arrayElemAt: ['$material', 0],
					},
				},
			},
			{
				$lookup: {
					from: 'expenses',
					localField: 'material._id',
					foreignField: 'matId',
					as: 'expense',
					pipeline: [
						{
							$sort: {
								date: -1,
							},
						},
					],
				},
			},
			{
				$project: {
					amount: 1,
					expense: {
						$arrayElemAt: ['$expense', 0],
					},
				},
			},
			{
				$project: {
					amount: 1,
					price: {
						$divide: ['$expense.total', '$expense.amount'],
					},
				},
			},
			{
				$project: {
					amount: 1,
					price: {
						$ifNull: ['$price', 0],
					},
				},
			},
			{
				$project: {
					total: {
						$multiply: ['$amount', '$price'],
					},
				},
			},
			{
				$group: {
					_id: 'total',
					totals: {
						$sum: '$total',
					},
				},
			},
		];
		try {
			const total = await Order.aggregate(agg);
			res.status(200).send(total[0].totals.toString());
		} catch (error) {
			throw new Error(error);
		}
	}
);
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
	getIngredientTotals,
	createOrder,
	deleteOrder,
};
