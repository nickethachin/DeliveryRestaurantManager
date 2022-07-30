const asyncHandler = require('express-async-handler')

const Item = require('../models/ItemModel')

// @desc    Get items
// @route   GET /api/items
// @access  Private
const getItems = asyncHandler(async (req, res) => {
  const items = await Item.find()

  res.status(200).json(items)
})

// @desc    Create item
// @route   POST /api/items
// @access  Private
const createItem = asyncHandler(async (req, res) => {
  if (!req.body.name) {
    res.status(400)
    throw new Error("Please fill 'name' field.")
  }

  const item = await Item.create({
    name: req.body.name,
  })
  res.status(200).json(item)
})

// TODO: Item's update
// TODO: Item's delete

module.exports = {
  getItems,
  createItem,
}
