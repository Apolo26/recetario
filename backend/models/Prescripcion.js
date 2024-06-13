const db = require('../config/db');

const Prescripcion = {
  getAll: (callback) => {
    db.query('SELECT * FROM prescripciones', callback);
  },
  getById: (id, callback) => {
    db.query('SELECT * FROM prescripciones WHERE prescripcion_id = ?', [id], callback);
  },
  create: (data, callback) => {
    db.query('INSERT INTO prescripciones SET ?', data, callback);
  },
  update: (id, data, callback) => {
    db.query('UPDATE prescripciones SET ? WHERE prescripcion_id = ?', [data, id], callback);
  },
  delete: (id, callback) => {
    db.query('DELETE FROM prescripciones WHERE prescripcion_id = ?', [id], callback);
  },
};

module.exports = Prescripcion