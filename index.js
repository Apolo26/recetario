const db = require("./backend/config/db");
const logger = require("./backend/logs/logger");
const app = require("./backend/server");

// Conexión a la base de datos
db.connect((err) => {
  if (err) {
    logger.log("Error al conectar a la base de datos: " + err.message);
    throw err;
  }
  logger.log("Conectado a la base de datos MySQL");
});

// Inicio del servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  logger.log(`Servidor corriendo en el puerto ${PORT}`);
});
