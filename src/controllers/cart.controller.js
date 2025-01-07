const cartService = require('../services/cart.service');

// Obtener el carrito
const getCart = async (req, res) => {
    const { userId } = req.params;
    const response = await cartService.getCart(userId);
    res.status(response.statusCode).json({ message: response.message, data: response.data });
};

// Agregar un producto al carrito
const addItemToCart = async (req, res) => {
    const { userId } = req.params;
    const response = await cartService.addItemToCart(userId, req.body);
    res.status(response.statusCode).json({ message: response.message, data: response.data });
};

// Actualizar un producto en el carrito
const updateCartItem = async (req, res) => {
    const { userId } = req.params;
    const { id, quantity } = req.body;
    const response = await cartService.updateCartItem(userId, id, quantity);
    res.status(response.statusCode).json({ message: response.message, data: response.data });
};

// Eliminar un producto del carrito
const removeItemFromCart = async (req, res) => {
    const { userId } = req.params;
    const { id } = req.body;
    const response = await cartService.removeItemFromCart(userId, id);
    res.status(response.statusCode).json({ message: response.message, data: response.data });
};

// Limpiar el carrito
const clearCart = async (req, res) => {
    const { userId } = req.params;
    const response = await cartService.clearCart(userId);
    res.status(response.statusCode).json({ message: response.message, data: response.data });
};

module.exports = {
    getCart,
    addItemToCart,
    updateCartItem,
    removeItemFromCart,
    clearCart,
};