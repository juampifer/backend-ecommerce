const mongoose = require('mongoose');
const cartItemSchema = require('../schema/cartItem.schema'); // Importa el subesquema
const { v4: uuidv4 } = require('uuid'); // Para generar `uuid`

const cartSchema = new mongoose.Schema(
  {
    _id: {
      type: String, // Cambiado a String para permitir `uuid`
      default: () => uuidv4(), // Usa `uuid` para carritos anónimos
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: function () {
        return !this._id; // Es obligatorio si no se usa un carrito anónimo (uuid)
      },
    },
    items: [cartItemSchema], // Lista de productos en el carrito
  },
  { timestamps: true }
);

module.exports = mongoose.model('Cart', cartSchema);