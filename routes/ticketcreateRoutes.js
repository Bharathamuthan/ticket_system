const express = require('express');
const router = express.Router();
const ticketcontroller = require('../controllers/ticketcreateController');

router.post('/createticket',ticketcontroller.createTicket);

router.get('/',ticketcontroller.getAllTickets);

router.get('/:id',ticketcontroller.getTicketById);

router.put('/:id',ticketcontroller.updateTicketById);

router.delete('/:id',ticketcontroller.deleteTicketById);

module.exports = router;

