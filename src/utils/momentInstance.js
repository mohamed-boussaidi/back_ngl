const moment = require('moment-timezone');
require('dotenv').config();

moment().tz(process.env.API_TIME_ZONE).format();

module.exports = moment;
