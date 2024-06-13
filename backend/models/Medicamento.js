const connection = require('../config/db');

const Medicamento = {
  
  getAll: (callback) => {
    connection.query('SELECT * FROM medicamentos WHERE estado = 1', callback);
  },
  getById: (id, callback) => {
    connection.query('SELECT * FROM medicamentos WHERE medicamento_id = ?', [id], callback);
  },
  create: (data, callback) => {
    connection.query('INSERT INTO medicamentos SET ?', data, callback);
  },
  update: (id, data, callback) => {
    connection.query('UPDATE medicamentos SET ? WHERE medicamento_id = ?', [data, id], callback);
  },
  delete: (id, callback) => {
    connection.query('UPDATE medicamentos SET estado = 0 WHERE medicamento_id = ?', [id], callback);
  },
  enable: (id, callback) => {
    connection.query('UPDATE medicamentos SET estado = 1 WHERE medicamento_id = ?', [id], callback);
  },
  disable: (id, callback) => {
    connection.query('UPDATE medicamentos SET estado = 2 WHERE medicamento_id = ?', [id], callback);
  }
};

module.exports = Medicamento;