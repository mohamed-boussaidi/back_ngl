const mongoose = require('mongoose');
const {Schema} = require("mongoose");

const dataSchema = new mongoose.Schema({
    name: {
        required: [true, "please enter name"],
        type: String
    },
    start_date: {
        required: [true, "please enter start_date"],
        type: Date
    },
    end_date: {
        required: [true, "please enter end_date"],
        type: Date
    },
    start_break: {
        required: [true, "please enter start_break"],
        type: Date
    },
    end_break: {
        required: [true, "please enter end_break"],
        type: Date
    },
    responsable :{type: Schema.Types.ObjectId, ref:'User'}
})

module.exports = mongoose.model('Tour', dataSchema)