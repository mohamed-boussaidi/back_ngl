const mongoose = require('mongoose');
const log = require('./logger');
require('dotenv').config();

async function connect() {
  const mongoString = process.env.DATABASE_URL;

  mongoose
    .connect(mongoString)
    .then(() => {
      log.info('Connected to DataBase');
    })
    .catch(() => {
      log.error('DataBase connection failed');
    });
}

module.exports = connect;
