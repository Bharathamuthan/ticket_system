const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
<<<<<<< HEAD
    description: { 
=======
    description: {
>>>>>>> 7cc168945e2b9c81a619f2f86322eac50cf7820f
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: String,
        enum: ['Open', 'In Progress', 'Resolved', 'Closed'],
        default: 'Open'
    },
<<<<<<< HEAD
    priority: { 
=======
    priority: {
>>>>>>> 7cc168945e2b9c81a619f2f86322eac50cf7820f
        type: String,
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
