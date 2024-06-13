const Profesional = require('../models/Profesional');

exports.getAllProfesionales = (req, res) => {
  Profesional.getAll((err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

exports.getProfesionalById = (req, res) => {
  const id = req.params.id;
  Profesional.getById(id, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(result);
  });
};

exports.createProfesional = (req, res) => {
  const data = req.body;
  Profesional.create(data, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: 'Profesional creado con éxito', id: result.insertId });
  });
};

exports.updateProfesional = (req, res) => {
  const id = req.params.id;
  const data = req.body;
  Profesional.update(id, data, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Profesional actualizado con éxito' });
  });
};

exports.deleteProfesional = (req, res) => {
  const id = req.params.id;
  Profesional.delete(id, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Profesional eliminado con éxito' });
  });
};

exports.obtenerNombreMedico = async (req, res) => {
  try {
    const nombreMedico = await Profesional.obtenerNombreMedico(req.user.id);
    return nombreMedico;
  } catch (error) {
    console.error(error);
    throw new Error('Error al obtener el nombre del médico');
  }
};