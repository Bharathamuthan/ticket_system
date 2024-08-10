const Ticket = require('../models/Ticket');
const User = require('../models/User');
const Project = require('../models/Project');

// Assign a ticket to a user
const assignTicket = async (req, res) => {
  try {
    const { userId } = req.body;
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) return res.status(404).send({ error: 'Ticket not found' });

    const userExists = await User.findById(userId);
    if (!userExists) return res.status(404).send({ error: 'User not found' });

    ticket.assignee = userId;
    await ticket.save();
    res.send(ticket);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Unassign a ticket to a user
const unassignTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) return res.status(404).send({ error: 'Ticket not found' });

    ticket.assignee = null;
    await ticket.save();
    res.send(ticket);
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports = {

    assignTicket,
    unassignTicket

}
