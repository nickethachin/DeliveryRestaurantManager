const express = require('express')
const router = express.Router()
const { getItems, createItem } = require('../controllers/itemController')

const { protect } = require('../middleware/authMiddleware')

router.route('/').get(protect, getItems).post(protect, createItem)
// TODO: Item's update&delete routes
// router.route('/:id').put(protect, updateItem).delete(protect, deleteItem)

module.exports = router
