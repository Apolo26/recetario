const Medicamento = require('../models/Medicamento');

exports.getAllMedicamentos = (req, res) => {
  Medicamento.getAll((err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

exports.getMedicamentoById = (req, res) => {
  const id = req.params.id;
  Medicamento.getById(id, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.length === 0) return res.status(404).json({ error: 'Medicamento no encontrado' });
    res.json(result[0]);
  });
};

exports.createMedicamento = (req, res) => {
  const data = req.body;
  Medicamento.create(data, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: 'Medicamento creado con éxito', id: result.insertId });
  });
};

exports.updateMedicamento = (req, res) => {
  const id = req.params.id;
  const medicamentoData = req.body;

  Medicamento.update(id, medicamentoData, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Medicamento no encontrado' });
    }
    res.json({ message: 'Medicamento actualizado con éxito' });
  });
};

exports.deleteMedicamento = (req, res) => {
  const id = req.params.id;
  Medicamento.delete(id, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Medicamento eliminado con éxito' });
  });
};

exports.enableMedicamento = (req, res) => {
  const id = req.params.id;
  Medicamento.enable(id, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Medicamento habilitado con éxito' });
  });
};

exports.disableMedicamento = (req, res) => {
  const id = req.params.id;
  Medicamento.disable(id, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Medicamento deshabilitado con éxito' });
  });
};
