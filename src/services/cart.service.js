const Cart = require('../models/cart.model');
const Product = require('../models/product.model');

/**
 * Formatea el carrito para que sea compatible con el frontend.
 * Convierte `_id` en `id` y ajusta los detalles del producto.
 */
const formatCart = (cart) => {
    const formattedCart = {
        userId: cart.userId.toString(),
        items: cart.items.map((item) => ({
            id: item.id._id.toString(), // Cambiar `_id` a `id`
            categoryId: item.id.categoryId?.toString(), // Incluye `categoryId` si existe
            name: item.id.name,
            description: item.id.description,
            price: item.id.price,
            offerPrice: item.id.offerPrice,
            image: item.id.image,
            quantity: item.quantity, // Incluye la cantidad
        })),
        createdAt: cart.createdAt,
        updatedAt: cart.updatedAt,
    };
    return formattedCart;
};

/**
 * Obtiene el carrito de un usuario.
 */
const getCart = async (userId) => {
    try {
        const cart = await Cart.findOne({ userId }).populate('items.id');
        if (!cart) {
            return {
                statusCode: 404,
                message: 'Carrito no encontrado',
            };
        }

        return {
            statusCode: 200,
            message: 'Carrito obtenido correctamente',
            data: formatCart(cart),
        };
    } catch (error) {
        console.error(error);
        return {
            statusCode: 500,
            message: 'Error al obtener el carrito',
        };
    }
};

/**
 * Agrega un producto al carrito.
 * Si el producto ya existe, actualiza la cantidad.
 */
const addItemToCart = async (userId, { id, quantity, name, price, image, description }) => {
    try {
        const product = await Product.findById(id);
        if (!product) {
            return {
                statusCode: 404,
                message: 'Producto no encontrado',
            };
        }

        let cart = await Cart.findOne({ userId });
        if (!cart) {
            cart = new Cart({ userId, items: [] });
        }

        const itemIndex = cart.items.findIndex((item) => item.id.equals(id));
        if (itemIndex > -1) {
            cart.items[itemIndex].quantity += quantity; // Actualiza la cantidad
        } else {
            cart.items.push({ id, quantity, name, price, image, description });
        }

        await cart.save();
        const updatedCart = await Cart.findOne({ userId }).populate('items.id');

        return {
            statusCode: 200,
            message: 'Producto agregado al carrito',
            data: formatCart(updatedCart),
        };
    } catch (error) {
        console.error(error);
        return {
            statusCode: 500,
            message: 'Error al agregar producto al carrito',
        };
    }
};

/**
 * Actualiza la cantidad de un producto en el carrito.
 */
const updateCartItem = async (userId, id, quantity) => {
    try {
        const cart = await Cart.findOne({ userId });
        if (!cart) {
            return {
                statusCode: 404,
                message: 'Carrito no encontrado',
            };
        }

        const itemIndex = cart.items.findIndex((item) => item.id.equals(id));
        if (itemIndex === -1) {
            return {
                statusCode: 404,
                message: 'Producto no encontrado en el carrito',
            };
        }

        cart.items[itemIndex].quantity = quantity; // Actualiza la cantidad
        await cart.save();
        const updatedCart = await Cart.findOne({ userId }).populate('items.id');

        return {
            statusCode: 200,
            message: 'Producto actualizado en el carrito',
            data: formatCart(updatedCart),
        };
    } catch (error) {
        console.error(error);
        return {
            statusCode: 500,
            message: 'Error al actualizar producto en el carrito',
        };
    }
};

/**
 * Elimina un producto del carrito.
 */
const removeItemFromCart = async (userId, id) => {
    try {
        const cart = await Cart.findOne({ userId });
        if (!cart) {
            return {
                statusCode: 404,
                message: 'Carrito no encontrado',
            };
        }

        const itemIndex = cart.items.findIndex((item) => item.id.equals(id));
        if (itemIndex === -1) {
            return {
                statusCode: 404,
                message: 'Producto no encontrado en el carrito',
            };
        }

        cart.items.splice(itemIndex, 1); // Elimina el producto del carrito
        await cart.save();
        const updatedCart = await Cart.findOne({ userId }).populate('items.id');

        return {
            statusCode: 200,
            message: 'Producto eliminado del carrito',
            data: formatCart(updatedCart),
        };
    } catch (error) {
        console.error(error);
        return {
            statusCode: 500,
            message: 'Error al eliminar producto del carrito',
        };
    }
};

/**
 * Limpia todos los productos del carrito.
 */
const clearCart = async (userId) => {
    try {
        const cart = await Cart.findOne({ userId });
        if (!cart) {
            return {
                statusCode: 404,
                message: 'Carrito no encontrado',
            };
        }

        cart.items = []; // Limpia todos los productos del carrito
        await cart.save();

        return {
            statusCode: 200,
            message: 'Carrito limpiado correctamente',
            data: formatCart(cart), // Devuelve el carrito vacío formateado
        };
    } catch (error) {
        console.error(error);
        return {
            statusCode: 500,
            message: 'Error al limpiar el carrito',
        };
    }
};

module.exports = {
    getCart,
    addItemToCart,
    updateCartItem,
    removeItemFromCart,
    clearCart,
};