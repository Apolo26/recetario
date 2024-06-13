const db = require('../config/db');

const Profesional = {
  getAll: (callback) => {
    db.query('SELECT * FROM profesionales', callback);
  },
  
  create: (data, callback) => {
    db.query('INSERT INTO profesionales SET ?', data, callback);
  },
  
  update: (id, data, callback) => {
    db.query('UPDATE profesionales SET ? WHERE profesional_id = ?', [data, id], callback);
  },
  
  delete: (id, callback) => {
    db.query('DELETE FROM profesionales WHERE profesional_id = ?', [id], callback);
  },

  getById: (id, callback) => {
    db.query('SELECT * FROM profesionales WHERE profesional_id = ?', [id], callback);
  },

  obtenerNombreMedico: (id, callback) => {
    db.query('SELECT nombre FROM profesionales WHERE profesional_id = ?', [id], callback);
  }
};

module.exports = Profesional;
