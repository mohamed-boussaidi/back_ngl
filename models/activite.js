const mongoose = require('mongoose');
const {Schema} = require("mongoose");

const dataSchema = new mongoose.Schema({
    name: {
        required: [true, "please enter name"],
        type: String
    },
    comment: {
        type: String
    },
    code: {
        required: [true, "please enter code"],
        type: Number,
        unique: true
    },
    classe :{type: Schema.Types.ObjectId, ref:'Classe'}
})

module.exports = mongoose.model('Activite', dataSchema)