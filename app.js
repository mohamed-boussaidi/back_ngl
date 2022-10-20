const express = require('express');
var cors = require('cors');
// const bodyParser = require('body-parser');
require('dotenv').config();

const router = require('./src/routes');
const log = require('./src/utils/logger');
const connect = require('./src/utils/connectDB');

const app = express();
// app.use(bodyParser.json({ limit: '30mb', extended: true }));
// app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(express.json());
app.use(
  cors({
    origin: '*',
    allowedHeaders: ['Content-Type', 'x-api-key', 'x-access-token'],
  })
);

app.use((req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  if (!apiKey || apiKey !== process.env.API_KEY) {
    res.status(401).json({ error: 'unauthorised x-api-key' });
  } else {
    next();
  }
});
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, DELETE, GET');
    return res.status(200).json({});
  }
  next();
});

app.use('/api', router);

const port = process.env.PORT;
app.listen(port, () => {
  log.info(`Server Started at http://localhost:${port}`);
  connect();
});
