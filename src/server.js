require("dotenv").config();

const mongoose = require("mongoose");
const app = require("./app");

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("Falta MONGO_URI en el archivo .env");
    }

    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB conectado correctamente");

    app.listen(PORT, () => {
      console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Error al iniciar servidor:", error.message);
    process.exit(1);
  }
};

startServer();
