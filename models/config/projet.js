const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    name: {
        required: [true, "please enter name"],
        type: String
    },
})

module.exports = mongoose.model('Projet', dataSchema)