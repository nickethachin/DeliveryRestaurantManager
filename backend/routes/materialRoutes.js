const express = require('express');
const router = express.Router();
const {
	getMaterials,
	createMaterial,
	updateMaterial,
	deleteMaterial,
} = require('../controllers/materialController');

const { protect } = require('../middleware/authMiddleware');

router
	.route('/')
	.get(protect, getMaterials)
	.post(protect, createMaterial);

router
	.route('/:id')
	.delete(protect, deleteMaterial)
	.put(protect, updateMaterial);

module.exports = router;
