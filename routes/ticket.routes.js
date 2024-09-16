const controller = require('../controllers/ticket.controller.js')
const router = require('express').Router();

router.post('/', controller.createTicket);
router.get('/', controller.getTickets);
router.put('/:id', controller.updateTicket);
router.delete('/:id', controller.deleteTicket);
module.exports = router;