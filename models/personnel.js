const mongoose = require('mongoose');
const {Schema} = require("mongoose");

const dataSchema = new mongoose.Schema({
    matricule: {
        required: [true, "please enter matricule"],
        type: Number,
        unique: true
    },
    first_name: {
        required: [true, "please enter first_name"],
        type: String
    },
    last_name: {
        required: [true, "please enter last_name"],
        type: String

    },
    date_embauche: {
        required: [true, "please enter date_embauche"],
        type: Date
    },
    mobile: {
        required: [true, "please enter mobile"],
        type: String
    },
    ville: {
        type: Schema.Types.ObjectId,
        ref:'Ville'
    },
    poste: {
        type: Schema.Types.ObjectId,
        ref:'Poste'
    },
    fonction: {
        type: Schema.Types.ObjectId,
        ref:'Fonction'
    },
    tour: {
        type: Schema.Types.ObjectId,
        ref:'Tour'
    },
    active: {
        default: true,
        type: Boolean
    },
    type: {
        required: [true, "please enter type"],
        type: String
    },
    comment: {
        type: String
    },
    sous_departement:  {
        type: Schema.Types.ObjectId,
        ref:'Department'
    },
})

module.exports = mongoose.model('Personnel', dataSchema)