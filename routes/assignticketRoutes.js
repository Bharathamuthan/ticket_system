const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/assignticketController');
const assignticketController = require('../controllers/assignticketController');
  

router.post('/:id/assign', assignticketController.assignTicket);
router.post('/:id/unassign', assignticketController.unassignTicket);

module.exports = router;