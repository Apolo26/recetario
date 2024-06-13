const express = require('express');
const router = express.Router();
const pacientesController = require('../controllers/pacientesController');

router.get('/', pacientesController.getAllPacientes);
router.get('/:id', pacientesController.getPacienteById);
router.post('/', pacientesController.createPaciente);
router.put('/:id', pacientesController.updatePaciente);
router.delete('/:id', pacientesController.deletePaciente);


router.put('/api/pacientes/:id', (req, res) => {
  const userId = req.params.id;
  const { nombre, apellido, documento, fecha_nacimiento, sexo, telefono, obra_social, plan, domicilio } = req.body;

  const sql = `
    UPDATE pacientes SET 
      nombre = ?, 
      apellido = ?, 
      documento = ?, 
      fecha_nacimiento = ?, 
      sexo = ?, 
      telefono = ?, 
      obra_social = ?, 
      plan = ?, 
      domicilio = ? 
    WHERE user_id = ?
  `;

  const values = [nombre, apellido, documento, fecha_nacimiento, sexo, telefono, obra_social, plan, domicilio, userId];

  db.query(sql, values, (error, results) => {
    if (error) {
      console.error('Error updating paciente information:', error);
      return res.status(500).json({ error: 'Error updating paciente information' });
    }
    res.json({ message: 'Paciente updated successfully' });
  });
});

module.exports = router;