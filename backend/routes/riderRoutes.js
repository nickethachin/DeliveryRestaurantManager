const express = require('express')
const router = express.Router()
const { getRiders, createRider } = require('../controllers/riderController')

const { protect } = require('../middleware/authMiddleware')

router.route('/').get(protect, getRiders).post(protect, createRider)
// TODO: Rider's update&delete routes
// router.route('/:id').put(protect, updateRider).delete(protect, deleteRider)

module.exports = router
