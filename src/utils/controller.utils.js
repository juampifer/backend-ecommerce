// Manejar respuestas estandarizadas para controladores
const handleResponse = (res, response) => {
  res.status(response.statusCode).json({
    message: response.message,
    data: response.data || null,
  });
};

// Obtener identificador del carrito (autenticado o anónimo)
const getCartIdentifier = (req) => {
  const userId = req.user?.id; // Usuario autenticado
  const cartId = req.cookies.cartId; // Usuario no autenticado
  return userId ? { userId } : { cartId };
};

module.exports = {
  handleResponse,
  getCartIdentifier,
};
