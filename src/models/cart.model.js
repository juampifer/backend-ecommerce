const mongoose = require('mongoose');
const cartItemSchema = require('../schema/cartItem.schema'); // Importa el subesquema

const cartSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [cartItemSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Cart', cartSchema);