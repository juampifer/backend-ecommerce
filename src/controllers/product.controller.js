const productService = require('../services/product.service');

// Obtener todos los productos
const getAllProducts = async (req, res) => {
    const response = await productService.getAllProducts(req);
    res.status(response.statusCode).json({ message: response.message, data: response.data });
};

// Obtener un producto por ID
const getProductById = async (req, res) => {
    const response = await productService.getProductById(req.params.id);
    res.status(response.statusCode).json({ message: response.message, data: response.data });
};

// Crear un nuevo producto
const createProduct = async (req, res) => {
    const response = await productService.createProduct(req.body);
    res.status(response.statusCode).json({ message: response.message, data: response.data });
};

// Actualizar un producto
const updateProduct = async (req, res) => {
    const response = await productService.updateProduct(req.params.id, req.body);
    res.status(response.statusCode).json({ message: response.message, data: response.data });
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