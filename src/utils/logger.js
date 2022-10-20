const logger = require('pino');
const moment = require('moment');

const log = logger({
  transport: {
    target: 'pino-pretty',
  },
  level: 'info',
  base: {
    pid: false,
  },
  timestamp: () => `,"time":"${moment().format()}"`,
});

module.exports = log;
