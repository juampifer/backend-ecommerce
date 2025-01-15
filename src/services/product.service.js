const Product = require('../models/product.model');
const Category = require('../models/category.model');

// Obtener todos los productos
const getAllProducts = async (req) => {
    try {
        // Obtener el parámetro de consulta
        const { slug } = req.query;
        let filter = {};

        if (slug) {
            // Buscar la categoría por slug
            const category = await Category.findOne({ slug });
            if (!category) {
                return {
                    statusCode: 404,
                    message: 'Categoría no encontrada',
                };
            }

            // Usar el _id de la categoría para filtrar productos
            filter = { categoryId: category._id };
        }

        // Consultar los productos con el filtro
        const products = await Product.find(filter);
        return {
            statusCode: 200,
            message: 'Productos obtenidos correctamente',
            data: products,
        };
    } catch (error) {
        console.error(error);
        return {
            statusCode: 500,
            message: 'Error al obtener los productos',
        };
    }
};

// Obtener un producto por ID
const getProductById = async (id) => {
    try {
        const product = await Product.findById(id);
        if (!product) {
            return {
                statusCode: 404,
                message: 'Producto no encontrado',
            };
        }
        return {
            statusCode: 200,
            message: 'Producto obtenido correctamente',
            data: product,
        };
    } catch (error) {
        return {
            statusCode: 500,
            message: 'Error al obtener el producto',
        };
    }
};

// Crear un nuevo producto
const createProduct = async (productData) => {
    try {
        const newProduct = new Product(productData);
        const savedProduct = await newProduct.save();
        return {
            statusCode: 201,
            message: 'Producto creado correctamente',
            data: savedProduct,
        };
    } catch (error) {
        return {
            statusCode: 500,
            message: 'Error al crear el producto',
        };
    }
};

// Actualizar un producto
const updateProduct = async (id, productData) => {
    try {
        const product = await Product.findById(id);
        if (!product) {
            return {
                statusCode: 404,
                message: 'Producto no encontrado',
            };
        }
        const updatedProduct = await Product.findByIdAndUpdate(id, productData);
        return {
            statusCode: 200,
            message: 'Producto actualizado correctamente',
            data: updatedProduct,
        };
    } catch (error) {
        return {
            statusCode: 500,
            message: 'Error al actualizar el producto',
        };
    }
};

// Eliminar un producto
const deleteProduct = async (id) => {
    try {
        const product = await Product.findById(id);
        if (!product) {
            return {
                statusCode: 404,
                message: 'Producto no encontrado',
            };
        }
        await product.deleteOne(product);
        return {
            statusCode: 200,
            message: 'Producto eliminado correctamente',
        };
    } catch (error) {
        return {
            statusCode: 500,
            message: 'Error al eliminar el producto',
        };
    }
};

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
};