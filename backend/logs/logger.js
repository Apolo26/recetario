const fs = require('fs');
const path = require('path');

const logFile = path.join(__dirname, '../logs/app.log');

const log = (level, message) => {
  const timestamp = new Date().toISOString();
  fs.appendFileSync(logFile, `${timestamp} - ${level}: ${message}\n`);
};

const error = (message) => {
  log('ERROR', message);
};

const info = (message) => {
  log('INFO', message);
};

module.exports = {
  log: (message) => log('LOG', message),
  error,
  info,
};
