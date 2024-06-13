const express = require('express');
const router = express.Router();
const profesionalesController = require('../controllers/profesionalesController');

router.get('/', profesionalesController.getAllProfesionales);
router.get('/:id', profesionalesController.getProfesionalById);
router.post('/', profesionalesController.createProfesional);
router.put('/:id', profesionalesController.updateProfesional);
router.delete('/:id', profesionalesController.deleteProfesional);

router.put('/api/medicos/:id', (req, res) => {
  const userId = req.params.id;
  const { nombre, apellido, documento, fecha_nacimiento, sexo, telefono, profesion, especialidad, domicilio, matricula, id_refeps, fecha_caducidad } = req.body;

  const sql = `
    UPDATE medicos SET 
      nombre = ?, 
      apellido = ?, 
      documento = ?, 
      fecha_nacimiento = ?, 
      sexo = ?, 
      telefono = ?, 
      profesion = ?, 
      especialidad = ?, 
      domicilio = ?, 
      matricula = ?, 
      id_refeps = ?, 
      fecha_caducidad = ? 
    WHERE user_id = ?
  `;

  const values = [nombre, apellido, documento, fecha_nacimiento, sexo, telefono, profesion, especialidad, domicilio, matricula, id_refeps, fecha_caducidad, userId];

  db.query(sql, values, (error, results) => {
    if (error) {
      console.error('Error updating medico information:', error);
      return res.status(500).json({ error: 'Error updating medico information' });
    }
    res.json({ message: 'Medico updated successfully' });
  });
});


module.exports = router;