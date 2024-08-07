const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  projectresources: {
    type: String,
    required: true,
  },
  todo: {
    type: String,
    required: true,
  },
  qa: {
    type: String,
    required: true,
  },
  bugs: {
    type: String,
    required: true,
  },
  done: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  created_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
  },
  modify_at: {
    type: Date,
    default: Date.now
  },
  modify_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project'
  }
});

module.exports = mongoose.model('Project', projectSchema);
