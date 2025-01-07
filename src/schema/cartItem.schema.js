const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema(
  {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    quantity: { type: Number, required: true, min: 1 },
  },
  { _id: false } // Evita que se genere un ID para cada ítem
);

module.exports = cartItemSchema;