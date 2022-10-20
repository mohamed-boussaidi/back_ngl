const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const dataSchema = new mongoose.Schema({
  first_name: {
    required: [true, 'please enter first_name'],
    type: String,
  },
  last_name: {
    required: [true, 'please enter last_name'],
    type: String,
  },
  password: {
    required: [true, 'please enter password'],
    type: String,
  },
  email: {
    required: [true, 'please enter email'],
    type: String,
    unique: true,
  },
  role: { type: Schema.Types.ObjectId, ref: 'Role' },
  token: { type: String },
  is_deleted: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model('User', dataSchema);
