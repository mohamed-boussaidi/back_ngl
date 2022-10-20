const mongoose = require('mongoose');
const {Schema} = require("mongoose");
const moment =require("../instance/momentInstance");

const dataSchema = new mongoose.Schema({

    odp: {type: Schema.Types.ObjectId, ref: 'Odp'},
    cycle: {type: Schema.Types.ObjectId, ref: 'Cycle'},
    personnel: {type: Schema.Types.ObjectId, ref: 'Personnel'},
    start_date: {
        required: [true, "please enter start_date"],
        type: Date,
        default : moment().format('YYYY-MM-DD[T]HH:mm:ss')
    },
    end_date: {
        type: Date,
    },
    status: {
        required: [true, "please enter status"],
        type: String,
        default : "created"
    },
    code: {
        required: [true, "please enter code"],
        type: String,
    },
    comment: {
        type: String,
        default : ""
    },

})

module.exports = mongoose.model('Odptask', dataSchema)