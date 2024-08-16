const Ticket = require('../models/ticket');
const User = require('../models/User');
<<<<<<< HEAD
const Project = require('../Models/project');
=======
const Project = require('../models/Project');
>>>>>>> 7cc168945e2b9c81a619f2f86322eac50cf7820f

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
