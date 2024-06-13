const db = require('../config/db');

const Prestacion = {
  getAll: (callback) => {
    db.query('SELECT * FROM prestaciones', callback);
  },
  getById: (id, callback) => {
    db.query('SELECT * FROM prestaciones WHERE prestacion_id = ?', [id], callback);
  },
  create: (data, callback) => {
    db.query('INSERT INTO prestaciones SET ?', data, callback);
  },
  update: (id, data, callback) => {
    db.query('UPDATE prestaciones SET ? WHERE prestacion_id = ?', [data, id], callback);
  },
  delete: (id, callback) => {
    db.query('DELETE FROM prestaciones WHERE prestacion_id = ?', [id], callback);
  },
};

module.exports = Prestacion;
