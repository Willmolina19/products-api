const express = require("express");
const cors = require("cors");

const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(cors({
  origin: "http://localhost:5173"
}));

app.use(express.json());

app.use("/", authRoutes);
app.use("/products", productRoutes);

app.get("/health", (req, res) => {
  res.status(200).json({
    message: "API funcionando correctamente"
  });
});

module.exports = app;