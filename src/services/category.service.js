const Category = require("../models/category.model");

/**
 * Obtiene todas las categorías ordenadas por el campo `order`.
 */
const getAllCategories = async () => {
  try {
    const categories = await Category.find().sort({ order: 1 }); // Orden ascendente
    return {
      statusCode: 200,
      message: "Categorías obtenidas correctamente",
      data: categories,
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      message: "Error al obtener las categorías",
    };
  }
};

/**
 * Crea una nueva categoría con un orden calculado o especificado.
 */
const createCategory = async (data) => {
  try {
    const lastCategory = await Category.findOne().sort({ order: -1 }); // Última categoría por orden
    const newOrder = lastCategory ? lastCategory.order + 1 : 1; // Incrementa el orden
    const category = new Category({ ...data, order: data.order || newOrder }); // Usa el orden recibido o el calculado
    const savedCategory = await category.save();
    return {
      statusCode: 201,
      message: "Categoría creada correctamente",
      data: savedCategory,
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      message: "Error al crear la categoría",
    };
  }
};

/**
 * Actualiza una categoría por su ID.
 */
const updateCategory = async (id, data) => {
  try {
    const updatedCategory = await Category.findByIdAndUpdate(id, data);
    if (!updatedCategory) {
      return {
        statusCode: 404,
        message: "Categoría no encontrada",
      };
    }
    return {
      statusCode: 200,
      message: "Categoría actualizada correctamente",
      data: updatedCategory,
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      message: "Error al actualizar la categoría",
    };
  }
};

module.exports = {
  getAllCategories,
  createCategory,
  updateCategory,
};
