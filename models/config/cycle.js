const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    code: {
        required: [true, "please enter code"],
        type: String
    },
    name: {
        required: [true, "please enter name"],
        type: String
    },
})

module.exports = mongoose.model('Cycle', dataSchema)