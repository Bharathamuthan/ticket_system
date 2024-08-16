const express = require('express');
const router = express.Router();
<<<<<<< HEAD
const ticketcontroller = require('../controllers/ticketcreateController');

router.post('/createticket',ticketcontroller.createTicket);

router.get('/',ticketcontroller.getAllTickets);

router.get('/:id',ticketcontroller.getTicketById);

router.put('/:id',ticketcontroller.updateTicketById);

router.delete('/:id',ticketcontroller.deleteTicketById);
=======
const ticketcreateController = require('../controllers/ticketcreateController');

router.post('/createticket',ticketcreateController.createTicket);

router.get('/',ticketcreateController.getAllTickets);

router.get('/:id',ticketcreateController.getTicketById);

router.put('/:id',ticketcreateController.updateTicketById);

router.delete('/:id',ticketcreateController.deleteTicketById);
>>>>>>> 7cc168945e2b9c81a619f2f86322eac50cf7820f

module.exports = router;

