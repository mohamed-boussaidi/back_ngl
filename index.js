const express = require('express');
const mongoose = require('mongoose');
const absence = require('./routes/absence');
const activite = require('./routes/activite');
const article = require('./routes/article');
const classe = require('./routes/classe');
const cycle = require('./routes/cycle');
const department = require('./routes/department');
const fonction = require('./routes/fonction');
const odp = require('./routes/odp');
const permissions = require('./routes/permissions');
const personnel = require('./routes/personnel');
const poste = require('./routes/poste');
const projet = require('./routes/projet');
const role = require('./routes/role');
const sousprojet = require('./routes/sousprojet');
const tour = require('./routes/tour');
const user = require('./routes/user');
const ville = require('./routes/ville');
const odptask = require('./routes/odptask');
const activitytask = require('./routes/activitytask');
var cors = require('cors');
const bodyParser = require("body-parser");
const scheduledFunctions = require('./cron/scheduledFunctions');

require('dotenv').config();

const mongoString = process.env.DATABASE_URL
mongoose.connect(mongoString);
const database = mongoose.connection
database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})

const app = express();
app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
const corsOpts = {
    origin: '*',
    allowedHeaders: [
        'Content-Type',
        'x-api-key',
        'x-access-token',
    ],
};

app.use(cors(corsOpts));
app.use((req, res, next) => {
    const apiKey = req.headers["x-api-key"]
    if (!apiKey || apiKey !== process.env.API_KEY) {
        res.status(401).json({error: 'unauthorised x-api-key'})
    } else {
        next()
    }
})
app.use(express.json());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if (req.method === 'OPTIONS') {
        res.header("Access-Control-Allow-Methods", "PUT, POST, DELETE, GET");
        return res.status(200).json({});
    }
    next();
});
app.use(express.static('public'));
app.use('/files', express.static('files_to_import'));
app.use('/api', absence,activite,article,classe,cycle,department,fonction,odp,permissions,personnel,poste,projet,role,sousprojet,tour,user,ville,odptask,activitytask);
scheduledFunctions.initScheduledJobs();

app.listen(3001, () => {
    console.log(`Server Started at ${3001}`)
})