const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Rutas estáticas
router.get('/', userController.getAllUsers);
router.post('/update-role', userController.updateUserRole);
router.delete('/delete/:user_id', userController.deleteUser);
router.get('/pacientes', userController.getPacientes);
router.get('/profesionales', userController.getProfesionales);

// Rutas dinámicas
router.get('/:userId', userController.getUserById);
router.put('/:userId', userController.updateUser);

module.exports = router;
