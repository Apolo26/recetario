const express = require('express');
const router = express.Router();
const historialRecetasController = require('../controllers/historialRecetasController');

router.post('/', historialRecetasController.crearHistorialReceta);
router.get('/', historialRecetasController.obtenerHistorialRecetas);

module.exports = router;
