const express = require('express');
const router = express.Router();
const prestacionesController = require('../controllers/prestacionesController');

router.get('/', prestacionesController.getAllPrestaciones);
router.get('/:id', prestacionesController.getPrestacionById);
router.post('/', prestacionesController.createPrestacion);
router.put('/:id', prestacionesController.updatePrestacion);
router.delete('/:id', prestacionesController.deletePrestacion);

module.exports = router;