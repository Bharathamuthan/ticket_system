const Ticket = require('../models/Ticket'); 

// Create a new ticket
const createTicket = async (req, res) => {
    try {
        const ticket = new Ticket(req.body);
        await ticket.save();
        res.status(201).send(ticket);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Get all tickets
const getAllTickets = async (req, res) => {
    try {
        const tickets = await Ticket.find({});
        res.status(200).send(tickets);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Get a single ticket by ID
const getTicketById = async (req, res) => {
    const _id = req.params.id;

    try {
        const ticket = await Ticket.findById(_id);
        if (!ticket) {
            return res.status(404).send();
        }
        res.status(200).send(ticket);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Update a ticket by ID
const updateTicketById = async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['title', 'description', 'status', 'priority', 'assignedTo'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' });
    }

    try {
        const ticket = await Ticket.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!ticket) {
            return res.status(404).send();
        }
        res.status(200).send(ticket);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Delete a ticket by ID
const deleteTicketById = async (req, res) => {
    try {
        const ticket = await Ticket.findByIdAndDelete(req.params.id);
        if (!ticket) {
            return res.status(404).send();
        }
        res.status(200).send(ticket);
    } catch (error) {
        res.status(500).send(error);
    }
};


module.exports = {
                   createTicket,
                   getAllTickets,
                   getTicketById,
                   updateTicketById,
                   deleteTicketById
}
