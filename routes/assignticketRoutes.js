const express = require('express');
const router = express.Router();
const assignticketController = require('../controllers/assignticketController');
  

router.post('/:id/assign', assignticketController.assignTicket);
router.post('/:id/unassign', assignticketController.unassignTicket);

module.exports = router;