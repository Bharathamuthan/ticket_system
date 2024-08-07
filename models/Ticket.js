const { required } = require('joi');
const mongoose = require('mongoose');

const TicketSchema = new mongoose.Schema({
  ticket_id: {
    type: String,
    required: true,
  },
  project_id: {
    type: String,
    required: true,
  },
  reporter: {
    type: String,
    required: true,
    unique: true,
  },
  assigned: {
    type: String,
    required: true,
    unique: true,
  },
  status: {
    type: String,
    required: true,
    unique: true,
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  created_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Ticket',
  },
  modify_at: {
    type: Date,
    default: Date.now
  },
  modify_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Ticket'
  }
});

module.exports = mongoose.model('Ticket', TicketSchema);
