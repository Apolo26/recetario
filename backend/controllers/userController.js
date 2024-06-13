const User = require('../models/User');

exports.getAllUsers = (req, res) => {
  User.findAll((err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Error retrieving users' });
    }
    res.status(200).json(results);
  });
};

exports.updateUserRole = (req, res) => {
  const { userId, newRole } = req.body;
  User.updateRole(userId, newRole, (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Error updating user role' });
    }
    res.status(200).json({ message: 'User role updated successfully' });
  });
};

exports.deleteUser = (req, res) => {
  const userId = req.params.user_id;
  User.deleteUser(userId, (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Error deleting user' });
    }
    res.status(200).json({ message: 'User deleted successfully' });
  });
};

exports.getPacientes = (req, res) => {
  const query = `
    SELECT nombre, apellido, documento, fecha_nacimiento, sexo, obra_social, plan, telefono
    FROM users
    WHERE role = 'paciente'
  `;

  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Error retrieving patients' });
    }
    res.status(200).json(results);
  });
};

exports.getProfesionales = (req, res) => {
  const query = `
    SELECT nombre, apellido, documento, profesion, especialidad, domicilio, matricula, id_refeps, fecha_caducidad, telefono
    FROM users
    WHERE role = 'medico'
  `;

  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Error retrieving professionals' });
    }
    res.status(200).json(results);
  });
}

exports.getUserById = (req, res) => {
  const userId = req.params.userId;

  User.findById(userId, (err, user) => {
    if (err) {
      console.error('Error retrieving user details:', err);
      return res.status(500).json({ error: 'Error retrieving user details' });
    }

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    let userDetails;
    if (user.role === 'paciente') {
      userDetails = {
        nombre: user.nombre,
        apellido: user.apellido,
        documento: user.documento,
        fecha_nacimiento: user.fecha_nacimiento,
        sexo: user.sexo,
        obra_social: user.obra_social,
        plan: user.plan,
        telefono: user.telefono
      };
    } else if (user.role === 'medico') {
      userDetails = {
        nombre: user.nombre,
        apellido: user.apellido,
        documento: user.documento,
        profesion: user.profesion,
        especialidad: user.especialidad,
        domicilio: user.domicilio,
        matricula: user.matricula,
        id_refeps: user.id_refeps,
        fecha_caducidad: user.fecha_caducidad,
        telefono: user.telefono
      };
    } else {
      return res.status(404).json({ error: 'Role not supported' });
    }

    res.status(200).json(userDetails);
  });
};

exports.updateUser = (req, res) => {
  const userId = req.params.userId;
  const updatedUserData = req.body;

  User.update(userId, updatedUserData, (err, result) => {
    if (err) {
      console.error('Error updating user information:', err);
    }

    res.status(200).json({ message: 'User information updated successfully' });
  });
};
