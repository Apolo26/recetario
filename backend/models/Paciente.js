const db = require('../config/db');

const Paciente = {
  getAll: (callback) => {
    db.query('SELECT * FROM pacientes', callback);
  },
  getById: (id, callback) => {
    db.query('SELECT * FROM pacientes WHERE paciente_id = ?', [id], callback);
  },
  create: (data, callback) => {
    db.query('INSERT INTO pacientes SET ?', data, callback);
  },
  update: (id, data, callback) => {
    db.query('UPDATE pacientes SET ? WHERE paciente_id = ?', [data, id], callback);
  },
  delete: (id, callback) => {
    db.query('DELETE FROM pacientes WHERE paciente_id = ?', [id], callback);
  },
};

module.exports = Paciente;
