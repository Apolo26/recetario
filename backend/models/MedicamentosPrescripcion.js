const db = require('../config/db');

const MedicamentosPrescripcion = {
  
  getAll: (callback) => {
    db.query('SELECT * FROM medicamentos_prescripcion', callback);
  },
  getById: (id, callback) => {
    db.query('SELECT * FROM medicamentos_prescripcion WHERE medicamento_prescripcion_id = ?', [id], callback);
  },
  create: (data, callback) => {
    db.query('INSERT INTO medicamentos_prescripcion SET ?', data, callback);
  },
  update: (id, data, callback) => {
    db.query('UPDATE medicamentos_prescripcion SET ? WHERE medicamento_prescripcion_id = ?', [data, id], callback);
  },
  delete: (id, callback) => {
    db.query('DELETE FROM medicamentos_prescripcion WHERE medicamento_prescripcion_id = ?', [id], callback);
  },
};

module.exports = MedicamentosPrescripcion;
