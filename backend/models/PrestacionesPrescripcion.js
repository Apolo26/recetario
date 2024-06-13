const db = require('../config/db');

const PrestacionesPrescripcion = {
  getAll: (callback) => {
    db.query('SELECT * FROM prestaciones_prescripcion', callback);
  },
  getById: (id, callback) => {
    db.query('SELECT * FROM prestaciones_prescripcion WHERE prestacion_prescripcion_id = ?', [id], callback);
  },
  create: (data, callback) => {
    db.query('INSERT INTO prestaciones_prescripcion SET ?', data, callback);
  },
  update: (id, data, callback) => {
    db.query('UPDATE prestaciones_prescripcion SET ? WHERE prestacion_prescripcion_id = ?', [data, id], callback);
  },
  delete: (id, callback) => {
    db.query('DELETE FROM prestaciones_prescripcion WHERE prestacion_prescripcion_id = ?', [id], callback);
  },
};

module.exports = PrestacionesPrescripcion;
