const mongoose = require('mongoose');
const {Schema} = require("mongoose");

const dataSchema = new mongoose.Schema({
    start_date: {
        required: [true, "please enter start_date"],
        type: Date,
    },
    end_date: {
        required: [true, "please enter end_date"],
        type: Date
    },
    hours: {
        required: [true, "please enter number of hours"],
        type: Number
    },
    comment: {
        type: String
    },
    status: {
        required: [true, "please enter status"],
        type: String
    },
    personal: {type: Schema.Types.ObjectId, ref:'Personnel'},


})

module.exports = mongoose.model('Absence', dataSchema)