const mongoose = require('mongoose')

const itemsetSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
    },
    items: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item',
      },
    ],
    workCost: {
      type: Number,
      required: [true, 'Please specify work cost (%)'],
    },
    gasCost: {
      type: Number,
      required: [true, 'Please sepcify gas cost'],
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Itemset', itemsetSchema)
