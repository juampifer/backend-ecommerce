const { body, param } = require("express-validator");

// Validación para la creación de una categoría
exports.validateCreateCategory = [
  body("name")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("El nombre es obligatorio")
    .isLength({ max: 50 })
    .withMessage("El nombre no debe exceder los 50 caracteres"),
  body("description")
    .optional()
    .trim()
    .escape()
    .isLength({ max: 255 })
    .withMessage("La descripción no debe exceder los 255 caracteres"),
  body("order")
    .notEmpty()
    .withMessage("El orden es obligatorio")
    .isInt({ gt: 0 })
    .withMessage("El orden debe ser un número entero positivo"),
  body("slug")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("El slug es obligatorio")
    .matches(/^[a-z0-9-]+$/)
    .withMessage("El slug solo puede contener letras minúsculas, números y guiones")
    .isLength({ max: 100 })
    .withMessage("El slug no debe exceder los 100 caracteres")
];

// Validación para la actualización de una categoría
exports.validateUpdateCategory = [
  param("id")
    .isMongoId()
    .withMessage("El ID de la categoría debe ser un ID válido"),
  body("name")
    .optional()
    .trim()
    .escape()
    .isLength({ max: 50 })
    .withMessage("El nombre no debe exceder los 50 caracteres"),
  body("description")
    .optional()
    .trim()
    .escape()
    .isLength({ max: 255 })
    .withMessage("La descripción no debe exceder los 255 caracteres"),
  body("order")
    .optional()
    .isInt({ gt: 0 })
    .withMessage("El orden debe ser un número entero positivo"),
];
