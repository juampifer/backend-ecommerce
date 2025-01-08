const cartService = require("../services/cart.service");

const handleResponse = (res, response) => {
  res.status(response.statusCode).json({
    message: response.message,
    data: response.data || null,
  });
};

// Obtener el identificador del carrito basado en la autenticación.
const getCartIdentifier = (req) => {
  const userId = req.user?.id; // Usuario autenticado
  const cartId = req.cookies.cartId; // Usuario no autenticado
  return userId ? { userId } : { cartId };
};

// Obtener el carrito
const getCart = async (req, res) => {
  const identifier = getCartIdentifier(req);
  const response = await cartService.getCart(identifier);
  handleResponse(res, response);
};

// Agregar un producto al carrito
const addItemToCart = async (req, res) => {
  const identifier = getCartIdentifier(req);
  const response = await cartService.addItemToCart(identifier, req.body);
  if (!req.user?.id && !req.cookies.cartId) {
    // se evalua si el cliente es anónimo y no tiene un carrito asociado
    res.cookie("cartId", response.data.id, { httpOnly: true }); // Configura el cartId en las cookies, httpOnly significa que la cookie solo puede ser accedida por el servidor y no por script en el navegador
  }
  handleResponse(res, response);
};

// Actualizar un producto en el carrito
const updateCartItem = async (req, res) => {
  const identifier = getCartIdentifier(req);
  const { id, quantity } = req.body;
  const response = await cartService.updateCartItem(identifier, id, quantity);
  handleResponse(res, response);
};

// Eliminar un producto del carrito
const removeItemFromCart = async (req, res) => {
  const identifier = getCartIdentifier(req);
  const { id } = req.body;
  const response = await cartService.removeItemFromCart(identifier, id);
  handleResponse(res, response);
};

// Limpiar el carrito
const clearCart = async (req, res) => {
  const identifier = getCartIdentifier(req);
  const response = await cartService.clearCart(identifier);
  handleResponse(res, response);
};

module.exports = {
  getCart,
  addItemToCart,
  updateCartItem,
  removeItemFromCart,
  clearCart,
};
