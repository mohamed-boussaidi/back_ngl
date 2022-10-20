const mongoose = require('mongoose');
const {Schema} = require("mongoose");
const moment = require("../instance/momentInstance");

const dataSchema = new mongoose.Schema({
    code: {
        required: [true, "please enter code"],
        type: Number,
        unique: true
    },
    quantite: {
        required: [true, "please enter quantite"],
        type: Number
    },
    comment: {
        type: String,
        default : ""

    },
    status: {
        required: [true, "please enter status"],
        type: String,
        default : "created"
    },
    priorite: {
        required: [true, "please enter priorite"],
        type: Number
    },
    cycleInstance: {type: Schema.Types.ObjectId, ref: 'Cycleinstance'},
    article: {type: Schema.Types.ObjectId, ref: 'Article'},
    createdAt: {
        type: Date,
        default : moment().format('YYYY-MM-DD[T]HH:mm:ss')

    },
    traited_at: {
        type: Date,
    },
    is_deleted: {
        type: Boolean,
        default : false
    },
})

module.exports = mongoose.model('Odp', dataSchema)