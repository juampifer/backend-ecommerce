const express = require("express");
const router = express.Router();
const {
    validateCreateCategory,
    validateUpdateCategory,
  } = require('../validators/category.validator');
const handleValidationErrors = require('../middlewares/handleValidationErrors');
const categoryController = require("../controllers/category.controller");

router.get("/", categoryController.getAllCategories);
router.post("/", validateCreateCategory, handleValidationErrors, categoryController.createCategory);
router.put("/:id", validateUpdateCategory, handleValidationErrors, categoryController.updateCategory);

module.exports = router;