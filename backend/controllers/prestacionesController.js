const Prestacion = require('../models/Prestacion');

exports.getAllPrestaciones = (req, res) => {
  Prestacion.getAll((err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

exports.getPrestacionById = (req, res) => {
  const id = req.params.id;
  Prestacion.getById(id, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(result);
  });
};

exports.createPrestacion = (req, res) => {
  const data = req.body;
  Prestacion.create(data, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: 'Prestación creada con éxito', id: result.insertId });
  });
};

exports.updatePrestacion = (req, res) => {
  const id = req.params.id;
  const data = req.body;
  Prestacion.update(id, data, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Prestación actualizada con éxito' });
  });
};

exports.deletePrestacion = (req, res) => {
  const id = req.params.id;
  Prestacion.delete(id, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Prestación eliminada con éxito' });
  });
};
