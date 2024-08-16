const mongoose = require('mongoose');

const RoleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    required: true,
    unique: true,
    sparse: true,
  },
  description: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  created_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  modify_at: {
    type: Date,
    default: Date.now
  },
  modify_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

module.exports = mongoose.model('Role', RoleSchema);

