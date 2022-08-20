const asyncHandler = require('express-async-handler');
const Material = require('../models/materialModel');

// @desc    Get materials
// @route   GET /api/materials
// @access  Private
const getMaterials = asyncHandler(async (req, res) => {
	const materials = await Material.find();
	res.status(200).json(materials);
});

// @desc    Create material
// @route   POST /api/materials
// @access  Private
const createMaterial = asyncHandler(async (req, res) => {
	const missingField = (field) => {
		res.status(400);
		throw new Error(`Please fill '${field}' field`);
	};
	if (!req.body.name) missingField('name');
	if (!req.body.type) missingField('type');
	if (!req.body.unit) missingField('unit');

	const material = await Material.create({
		name: req.body.name,
		type: req.body.type,
		unit: req.body.unit,
	});
	res.status(200).json(material);
});

// @desc    Update material
// @route   PUT /api/materials/:id
// @access  Private
const updateMaterial = asyncHandler(async (req, res) => {
	const material = await Material.findById(req.params.id);
	const missingField = (field) => {
		res.status(400);
		throw new Error(`Please fill '${field}' field`);
	};

	if (!material) {
		res.status(400);
		throw new Error('Material not found');
	}

	// Allow undefine field but stop empty field
	if (req.body.name == '') missingField('name');
	if (req.body.type == '') missingField('type');
	if (req.body.unit == '') missingField('unit');

	const updatedMaterial = await Material.findByIdAndUpdate(
		req.params.id,
		req.body,
		{
			new: true,
		}
	);
	res.status(200).json(updatedMaterial);
});

// @desc    Delete material
// @route   DELETE /api/materials/:id
// @access  Private
const deleteMaterial = asyncHandler(async (req, res) => {
	const material = await Material.findById(req.params.id);
	if (!material) {
		res.status(400);
		throw new Error('Material not found');
	}
	await material.remove();
	res.status(200).json({ id: req.params.id });
});

module.exports = {
	getMaterials,
	createMaterial,
	updateMaterial,
	deleteMaterial,
};
