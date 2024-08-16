const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/assignticketController');
  

router.post('/:id/assign', ticketController.assignTicket);
router.post('/:id/unassign', ticketController.unassignTicket);

module.exports = router;