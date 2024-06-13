const db = require('../config/db');

const User = {
  create: (userData, callback) => {
    const query = 'INSERT INTO users SET ?';
    db.query(query, userData, callback);
  },
  findByUsername: (username, callback) => {
    const query = 'SELECT * FROM users WHERE username = ?';
    db.query(query, [username], callback);
  },
  findAll: (callback) => {
    const query = 'SELECT * FROM users';
    db.query(query, callback);
  },
  findById: (userId, callback) => {
    const query = 'SELECT * FROM users WHERE user_id = ?';
    db.query(query, [userId], (err, result) => {
      if (err) {
        callback(err, null);
        return;
      }
      if (result.length === 0) {
        callback(null, null); // No se encontró ningún usuario con ese ID
        return;
      }
      callback(null, result[0]); // Devuelve el primer usuario encontrado
    });
  },
  updateRole: (userId, newRole, callback) => {
    const query = 'UPDATE users SET role = ? WHERE user_id = ?';
    db.query(query, [newRole, userId], callback);
  },
  deleteUser: (userId, callback) => {
    const query = 'DELETE FROM users WHERE user_id = ?';
    db.query(query, [userId], callback);
  },
  update: (userId, updatedUserData, callback) => {
    const query = 'UPDATE users SET ? WHERE user_id = ?';
    db.query(query, [updatedUserData, userId], callback);
  },
  getPacienteById: (pacienteId, callback) => {
    const query = 'SELECT nombre FROM pacientes WHERE paciente_id = ?';
    db.query(query, [pacienteId], (err, results) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, results[0]);
    });
  }
};

module.exports = User;
