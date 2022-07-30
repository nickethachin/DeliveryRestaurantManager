const mongoose = require('mongoose')
const { float } = require('webidl-conversions')

const riderSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
      unique: true,
    },
    fees: {
      type: Number,
      required: [true, "Please specify rider's fees"],
    },
    tax: {
      type: Number,
      required: [true, "Please specify rider's tax"],
    },
    gasCost: {
      type: Number,
      required: false,
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Rider', riderSchema)
