const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
<<<<<<< HEAD:models/ticket.js
=======

>>>>>>> e5c9d9db5f1247c37b13fdc723b4a9edd60174d6:models/Ticket.js
    description: {
        type: String,
        required: true,
        trim:true
    },
    status: {
        type: String,
        enum: ['Open', 'In Progress', 'Resolved', 'Closed'],
        default: 'Open'
    },
<<<<<<< HEAD:models/ticket.js
      priority:{  type: String,
=======
    priority: {
        type: String,
>>>>>>> e5c9d9db5f1247c37b13fdc723b4a9edd60174d6:models/Ticket.js
        enum: ['Low', 'Medium', 'High', 'Critical'],
        default: 'Low'
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',  
        required: true
    },
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        default: null
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

ticketSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

const Ticket = mongoose.model('Ticket', ticketSchema);

module.exports = Ticket;
