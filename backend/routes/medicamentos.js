const express = require('express');
const router = express.Router();
const medicamentosController = require('../controllers/medicamentosController');

// Rutas para Medicamentos
router.get('/', medicamentosController.getAllMedicamentos);
router.get('/:id', medicamentosController.getMedicamentoById);
router.post('/', medicamentosController.createMedicamento);
router.put('/:id', medicamentosController.updateMedicamento);
router.put('/enable/:id', medicamentosController.enableMedicamento);
router.put('/disable/:id', medicamentosController.disableMedicamento);
router.delete('/:id', medicamentosController.deleteMedicamento);

module.exports = router;
