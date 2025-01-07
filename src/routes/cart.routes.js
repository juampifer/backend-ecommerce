const express = require("express");
const router = express.Router();
const {
  getCart,
  addItemToCart,
  updateCartItem,
  removeItemFromCart,
  clearCart,
} = require("../controllers/cart.controller");

// Obtener el carrito
router.get("/:userId", getCart);

// Agregar un ítem al carrito
router.post("/:userId", addItemToCart);

// Actualizar la cantidad de un ítem
router.put("/:userId", updateCartItem);

// Eliminar un ítem del carrito
router.delete("/:userId", removeItemFromCart);

// Limpiar el carrito
router.delete("/:userId/clearCart", clearCart);

module.exports = router;
