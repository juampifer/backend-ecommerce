const Cart = require('../models/cart.model');
const Product = require('../models/product.model');
const { v4: uuidv4 } = require('uuid');

/**
 * Formatea el carrito para que sea compatible con el frontend.
 */
const formatCart = (cart) => {
    return {
        id: cart._id.toString(),
        userId: cart.userId?.toString() || null,
        items: cart.items.map((item) => ({
            id: item.id._id.toString(),
            categoryId: item.id.categoryId?.toString(),
            name: item.id.name,
            description: item.id.description,
            price: item.id.price,
            offerPrice: item.id.offerPrice,
            image: item.id.image,
            quantity: item.quantity,
        })),
        createdAt: cart.createdAt,
        updatedAt: cart.updatedAt,
    };
};

/**
 * Encuentra o crea un carrito para un identificador (userId o cartId).
 */
const findOrCreateCart = async (identifier) => {
    const query = identifier.userId ? { userId: identifier.userId } : { _id: identifier.cartId };

    let cart = await Cart.findOne(query).populate('items.id');

    if (!cart) {
        cart = new Cart({
            _id: identifier.cartId || uuidv4(), // Usa `uuidv4` si no existe `cartId`
            userId: identifier.userId || null, // Si el usuario está autenticado, usa su `userId`
            items: [],
        });

        await cart.save();
    }

    return cart;
};

/**
 * Obtiene el carrito basado en el identificador.
 */
const getCart = async (identifier) => {
    try {
        const cart = await findOrCreateCart(identifier);
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
 */
const addItemToCart = async (identifier, product) => {
    try {
        const { id, quantity = 1 } = product;

        // Busca o crea el carrito para el usuario
        const cart = await findOrCreateCart(identifier);

        // Verifica si el producto ya existe en el carrito
        const itemExists = cart.items.some((item) => item.id.equals(id));

        if (itemExists) {
            // Si el producto ya existe, no lo agrega de nuevo
            return {
                statusCode: 400,
                message: 'El producto ya existe en el carrito. Use el endpoint de actualización.',
            };
        }

        // Agrega el nuevo producto con la cantidad especificada o por defecto 1
        cart.items.push({ ...product, quantity });

        // Guarda el carrito y lo actualiza
        await cart.save();
        const updatedCart = await Cart.findById(cart._id).populate('items.id');

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
const updateCartItem = async (identifier, id, quantity) => {
    try {
        const cart = await findOrCreateCart(identifier);
        const itemIndex = cart.items.findIndex((item) => item.id.equals(id));

        if (itemIndex === -1) {
            return {
                statusCode: 404,
                message: 'Producto no encontrado en el carrito',
            };
        }

        cart.items[itemIndex].quantity = quantity;
        await cart.save();
        const updatedCart = await Cart.findById(cart._id).populate('items.id');

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
const removeItemFromCart = async (identifier, id) => {
    try {
        const cart = await findOrCreateCart(identifier);
        cart.items = cart.items.filter((item) => !item.id.equals(id));
        await cart.save();
        const updatedCart = await Cart.findById(cart._id).populate('items.id');

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
const clearCart = async (identifier) => {
    try {
        const cart = await findOrCreateCart(identifier);
        cart.items = [];
        await cart.save();

        return {
            statusCode: 200,
            message: 'Carrito limpiado correctamente',
            data: formatCart(cart),
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