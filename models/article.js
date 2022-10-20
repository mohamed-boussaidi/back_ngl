const mongoose = require('mongoose');
const {Schema} = require("mongoose");

const dataSchema = new mongoose.Schema({
    code: {
        required: [true, "please enter code"],
        type: String,
        unique: true
    },
    description: {
        type: String
    },
    nbr_fils: {
        required: [true, "please enter number of fils"],
        type: Number
    },
    sous_projet: {type: Schema.Types.ObjectId, ref: 'Sousprojet'},
    cycle: [{type: Schema.Types.ObjectId, ref: 'Cycle'}],
})

module.exports = mongoose.model('Article', dataSchema)