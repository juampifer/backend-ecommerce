const productService = require('../services/product.service');

const handleResponse = (res, response) => {
    res.status(response.statusCode).json({
      message: response.message,
      data: response.data || null,
    });
  };

// Obtener todos los productos
const getAllProducts = async (req, res) => {
    const response = await productService.getAllProducts(req);
    handleResponse(res, response);
};

// Obtener un producto por ID
const getProductById = async (req, res) => {
    const response = await productService.getProductById(req.params.id);
    handleResponse(res, response);
};

// Crear un nuevo producto
const createProduct = async (req, res) => {
    const response = await productService.createProduct(req.body);
    handleResponse(res, response);
};

// Actualizar un producto
const updateProduct = async (req, res) => {
    const response = await productService.updateProduct(req.params.id, req.body);
    handleResponse(res, response);
};

// Eliminar un producto
const deleteProduct = async (req, res) => {
    const response = await productService.deleteProduct(req.params.id);
    res.status(response.statusCode).json({ message: response.message });
};

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
};