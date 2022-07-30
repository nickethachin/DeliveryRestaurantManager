const mongoose = require('mongoose')

const priceSchema = mongoose.Schema(
  {
    item: {
      type: ObjectId,
      required: [true, 'Please select item'],
    },
    rider: {
      type: ObjectId,
      required: [true, 'Please select rider'],
    },
    price: {
      type: ObjectId,
      required: [true, 'Please specify price'],
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Price', priceSchema)
