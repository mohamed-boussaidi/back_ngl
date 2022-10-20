const mongoose = require('mongoose');
const {Schema} = require("mongoose");

const dataSchema = new mongoose.Schema({
    name: {
        required: [true, "please enter name"],
        type: String
    },

    projet :{type: Schema.Types.ObjectId, ref:'Projet'}
})

module.exports = mongoose.model('Sousprojet', dataSchema)