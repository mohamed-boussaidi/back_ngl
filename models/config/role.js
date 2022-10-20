const mongoose = require('mongoose');
const {Schema} = require("mongoose");

const dataSchema = new mongoose.Schema({
    name: {
        required: [true, "please enter name"],
        type: String
    },
    permissions :[{type: Schema.Types.ObjectId, ref:'Permission'}]
})

module.exports = mongoose.model('Role', dataSchema)