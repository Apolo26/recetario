const db = require('../config/db');

const HistorialRecetas = {
  getAll: (callback) => {
    db.query('SELECT * FROM historial_recetas', callback);
  },
  getById: (id, callback) => {
    db.query('SELECT * FROM historial_recetas WHERE id = ?', [id], callback);
  },
  getByProfesionalId: (profesionalId, callback) => {
    db.query('SELECT * FROM historial_recetas WHERE profesional_id = ?', [profesionalId], callback);
  },
  getByPacienteId: (pacienteId, callback) => {
    db.query('SELECT * FROM historial_recetas WHERE paciente_id = ?', [pacienteId], callback);
  },
  create: (data, callback) => {
    db.query('INSERT INTO historial_recetas SET ?', data, callback);
  },
  update: (id, data, callback) => {
    db.query('UPDATE historial_recetas SET ? WHERE id = ?', [data, id], callback);
  },
  delete: (id, callback) => {
    db.query('DELETE FROM historial_recetas WHERE id = ?', [id], callback);
  }
};

module.exports = HistorialRecetas;
