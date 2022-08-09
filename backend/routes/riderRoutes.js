const express = require('express');
const router = express.Router();
const {
	getRiders,
	createRider,
	deleteRider,
	updatePrice,
} = require('../controllers/riderController');

const { protect } = require('../middleware/authMiddleware');

router
	.route('/')
	.get(protect, getRiders)
	.post(protect, createRider);
router.route('/price/').post(protect, updatePrice);
// TODO: Rider's update routes
router.route('/:id').delete(protect, deleteRider);
// .put(protect, updateRider)

module.exports = router;
