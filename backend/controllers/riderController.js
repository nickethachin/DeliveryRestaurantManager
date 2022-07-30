const asyncHandler = require('express-async-handler')

const Rider = require('../models/RiderModel')

// @desc    Get riders
// @route   GET /api/riders
// @access  Private
const getRiders = asyncHandler(async (req, res) => {
  const riders = await Rider.find()

  res.status(200).json(riders)
})

// @desc    Create rider
// @route   POST /api/riders
// @access  Private
const createRider = asyncHandler(async (req, res) => {
  if (!req.body.name) {
    res.status(400)
    throw new Error("Please fill 'name' field.")
  }
  if (!req.body.fees) {
    res.status(400)
    throw new Error("Please fill 'fees' field.")
  }
  if (!req.body.tax) {
    res.status(400)
    throw new Error("Please fill 'tax' field.")
  }

  const rider = await Rider.create({
    name: req.body.name,
    fees: req.body.fees,
    tax: req.body.tax,
    gasCost: req.body.gas,
  })
  res.status(200).json(rider)
})

// TODO: Rider's update
// TODO: Rider's delete

module.exports = {
  getRiders,
  createRider,
}
