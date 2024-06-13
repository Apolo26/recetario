const logger = require('../logs/logger'); // Asegúrate de importar tu logger

const errorHandler = (err, req, res, next) => {
  logger.error('Error capturado en el middleware: ' + err.message);
  res.status(500).json({ error: 'Error en el servidor' });
};

module.exports = errorHandler;
