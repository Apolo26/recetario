const express = require('express');
const router = express.Router();
const Medicamento = require('./Medicamento');

router.get('/', (req, res) => {
  Medicamento.getAll((err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  Medicamento.getById(id, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(result);
  });
});

router.post('/', (req, res) => {
  const data = req.body;
  Medicamento.create(data, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: 'Medicamento creado con éxito', id: result.insertId });
  });
});

router.put('/:id', (req, res) => {
  const id = req.params.id;
  const data = req.body;
  Medicamento.update(id, data, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Medicamento actualizado con éxito' });
  });
});

router.delete('/:id', (req, res) => {
  const id = req.params.id;
  Medicamento.delete(id, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Medicamento eliminado con éxito' });
  });
});

module.exports = router;