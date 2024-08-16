const express = require('express');
const router = express.Router();
<<<<<<< HEAD
const ticketController = require('../controllers/assignticketController');
=======
const assignticketController = require('../controllers/assignticketController');
>>>>>>> 7cc168945e2b9c81a619f2f86322eac50cf7820f
  

router.post('/:id/assign', assignticketController.assignTicket);
router.post('/:id/unassign', assignticketController.unassignTicket);

module.exports = router;