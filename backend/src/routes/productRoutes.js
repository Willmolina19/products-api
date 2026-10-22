const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken");

const validateProduct = require("../middlewares/validateProduct");

const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct
} = require("../controllers/productController");

// Crear producto
router.post("/", verifyToken, validateProduct, createProduct);

// Obtener todos los productos
router.get("/", getProducts);

// Obtener producto por ID
router.get("/:id", getProductById);

// Actualizar producto
router.put("/:id", validateProduct, updateProduct);

// Eliminar producto
router.delete("/:id", deleteProduct);

module.exports = router;
