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
router.get("/", getCart);

// Agregar un ítem al carrito
router.post("/", addItemToCart);

// Actualizar la cantidad de un ítem
router.put("/", updateCartItem);

// Eliminar un ítem del carrito
router.delete("/", removeItemFromCart);

// Limpiar el carrito
router.delete("/clearCart", clearCart);

module.exports = router;
