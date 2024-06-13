const Paciente = require('../models/Paciente');

exports.getAllPacientes = (req, res) => {
  Paciente.getAll((err, results) => {
    if (err) {
      console.error('Error al obtener pacientes:', err);
      return res.status(500).json({ message: 'Error al obtener pacientes', error: err });
    }
    res.status(200).json(results);
  });
};

exports.getPacienteById = (req, res) => {
  const id = req.params.id;
  Paciente.getById(id, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });

    // Filtrar los datos del paciente para devolver solo lo necesario
    const paciente = {
      obra_social: result.obra_social,
      plan: result.plan
    };

    res.json(paciente);
  });
};

exports.createPaciente = (req, res) => {
  const data = req.body;
  Paciente.create(data, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: 'Paciente creado con éxito', id: result.insertId });
  });
};

exports.updatePaciente = (req, res) => {
  const id = req.params.id;
  const data = req.body;
  Paciente.update(id, data, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Paciente actualizado con éxito' });
  });
};

exports.deletePaciente = (req, res) => {
  const id = req.params.id;
  Paciente.delete(id, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Paciente eliminado con éxito' });
  });
};
