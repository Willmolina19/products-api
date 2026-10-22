
const mongoose = require("mongoose");
const Product = require("../models/Product");

// POST - Crear producto
const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);

    return res.status(201).json(product);
  } catch (error) {
    return res.status(500).json({
      error: "Error al crear producto"
    });
  }
};

// GET - Obtener todos los productos
const getProducts = async (req, res) => {
  try {
    const products = await Product.find();

    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({
      error: "Error al obtener productos"
    });
  }
};

// GET - Obtener producto por ID
const getProductById = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        error: "ID de producto inválido"
      });
    }

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        error: "Producto no encontrado"
      });
    }

    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json({
      error: "Error al buscar producto"
    });
  }
};

// PUT - Actualizar producto
const updateProduct = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        error: "ID de producto inválido"
      });
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
        overwrite: true
      }
    );

    if (!product) {
      return res.status(404).json({
        error: "Producto no encontrado"
      });
    }

    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json({
      error: "Error al actualizar producto"
    });
  }
};

// DELETE - Eliminar producto
const deleteProduct = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        error: "ID de producto inválido"
      });
    }

    const product = await Product.findByIdAndDelete(
      req.params.id
    );

    if (!product) {
      return res.status(404).json({
        error: "Producto no encontrado"
      });
    }

    return res.status(200).json({
      message: "Producto eliminado correctamente"
    });
  } catch (error) {
    return res.status(500).json({
      error: "Error al eliminar producto"
    });
  }
};

// Exportar todos los controladores
module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct
};
