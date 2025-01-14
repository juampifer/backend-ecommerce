const categoryService = require("../services/category.service");
const { handleResponse } = require("../utils/controller.utils");

// Obtener todas las categorías
const getAllCategories = async (req, res) => {
  const response = await categoryService.getAllCategories();
  handleResponse(res, response);
};

// Crear una nueva categoría
const createCategory = async (req, res) => {
  const response = await categoryService.createCategory(req.body);
  handleResponse(res, response);
};

// Actualizar una categoría
const updateCategory = async (req, res) => {
  const response = await categoryService.updateCategory(
    req.params.id,
    req.body
  );
  handleResponse(res, response);
};

module.exports = {
  getAllCategories,
  createCategory,
  updateCategory,
};
