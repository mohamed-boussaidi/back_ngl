const express = require('express');

const user = require('./user.routes');

const router = express.Router();

router.get('/healthcheck', (_, res) => res.status(200));
router.use('/', user);

module.exports = router;
