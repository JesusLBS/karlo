const { sequelize } = require("../models/index");

const dbConnect = async () => {
  try {
    await sequelize.authenticate();
  } catch (error) {
    console.error("❌  Error en la conexión de la base de datos: ");
    throw error;
  }
};

module.exports = dbConnect;
