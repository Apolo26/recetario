const express = require('express');
const router = express.Router();
const prescripcionController = require('../controllers/prescripcionController');

router.get('/', prescripcionController.getAllPrescripciones);
router.get('/:id', prescripcionController.getPrescripcionById);
router.post('/', prescripcionController.createPrescripcion);
router.put('/:id', prescripcionController.updatePrescripcion);
router.delete('/:id', prescripcionController.deletePrescripcion);
router.post('/upload', prescripcionController.uploadPrescripcion);

module.exports = router;
