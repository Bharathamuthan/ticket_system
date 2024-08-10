const express = require('express');
const router = express.Router();
const ticketcreateController = require('../controllers/ticketcreateController');

router.post('/createticket',ticketcreateController.createTicket);

router.get('/',ticketcreateController.getAllTickets);

router.get('/:id',ticketcreateController.getTicketById);

router.put('/:id',ticketcreateController.updateTicketById);

router.delete('/:id',ticketcreateController.deleteTicketById);

module.exports = router;

