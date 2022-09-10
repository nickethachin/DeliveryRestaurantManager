const express = require('express')
const router = express.Router()
const {
  getItemsets,
  createItemset,
} = require('../controllers/itemsetController')

const { protect } = require('../middleware/authMiddleware')

router.route('/').get(protect, getItemsets).post(protect, createItemset)
// TODO: Itemset's update&delete routes
// router.route('/:id').put(protect, updateItemset).delete(protect, deleteItemset)

module.exports = router
