
const express = require("express");
const productRoutes = require("./routes/productRoutes");

const app = express();

// Middleware para recibir JSON
app.use(express.json());

// Rutas de productos
app.use("/products", productRoutes);

// Ruta de prueba
app.get("/health", (req, res) => {
  res.status(200).json({
    message: "API funcionando correctamente"
  });
});

module.exports = app;
