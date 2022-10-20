const mongoose = require('mongoose');
const {Schema} = require("mongoose");

const dataSchema = new mongoose.Schema({
    data: [{
        cycle: {type: Schema.Types.ObjectId, ref: 'Cycle'},
        status: { type: String },
        start_date: { type: Date },
        end_date: { type: Date }
    }]
})

module.exports = mongoose.model('Cycleinstance', dataSchema)