const express = require('express')
const router = express.Router()
const { getRiders, createRider, updatePrice } = require('../controllers/riderController')

const { protect } = require('../middleware/authMiddleware')

router.route('/').get(protect, getRiders).post(protect, createRider)
router.route('/price/').post(protect, updatePrice)
// TODO: Rider's update&delete routes
// router.route('/:id').put(protect, updateRider).delete(protect, deleteRider)

module.exports = router
