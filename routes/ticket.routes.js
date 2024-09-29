const controller = require('../controllers/ticket.controller.js')
const router = require('express').Router();

// Tickets itself
router.post('/', controller.createTicket);
router.get('/', controller.getTickets);
router.get('/:id', controller.getTicketById);
router.put('/:id', controller.updateTicket);
router.patch('/close/:id', controller.closeTicket);
router.delete('/:id', controller.deleteTicket);
// Comments on Comment table
router.post('/comment/:id', controller.createComment);
router.get('/comment/:id', controller.getComment);
router.put('/comment/:id', controller.updateComment);
router.delete('/comment/:id', controller.deleteComment);

module.exports = router;