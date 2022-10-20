const mongoose = require('mongoose');
const {Schema} = require("mongoose");

const dataSchema = new mongoose.Schema({
    name: {
        required: [true, "please enter name"],
        type: String
    },
    department :{type: Schema.Types.ObjectId, ref:'Department'}
})

module.exports = mongoose.model('Classe', dataSchema)