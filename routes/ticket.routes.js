const controller = require('../controllers/ticket.controller.js');
const router = require('express').Router();

// Tickets routes
router.post('/', controller.createTicket);
router.get('/', controller.getTickets);
router.get('/:id', controller.getTicketById);
router.put('/:id', controller.updateTicket);
router.patch('/forward/:id', controller.forwardTicket);
router.patch('/close/:id', controller.closeTicket);
router.delete('/:id', controller.deleteTicket);

// Comments routes
router.post('/comment/:id', controller.createComment);
router.get('/comment/:id', controller.getComment);
router.put('/comment/:id', controller.updateComment);
router.delete('/comment/:id', controller.deleteComment);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Tickets
 *   description: Ticket and comments management
 */
/**
 * @swagger
 * /tickets/:
 *   post:
 *     tags: [Tickets]
 *     summary: Add new ticket
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true     
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ticket:
 *                 type: object
 *                 properties:
 *                   area:
 *                     type: string
 *                     example: "Administrativa"
 *                   title:
 *                     type: string
 *                     example: "Preciso de Bolinhos de arroz"
 *                   description:
 *                     type: string
 *                     example: "Necessito deles urgentemente."
 *                   Observers:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                           example: 1
 *                         User:
 *                           type: object
 *                           properties:
 *                             id:
 *                               type: integer
 *                               example: 2
 *                             name:
 *                               type: string
 *                               example: "Daniel McFace"
 *     responses:
 *       200:
 *         description: Added ticket successfully
 *       400:
 *         description: Error occurred while adding ticket
 *       401:
 *         description: Unauthorized - token missing or invalid
 */
/**
 * @swagger
 * /tickets/:
 *   get:
 *     tags: [Tickets]
 *     summary: Get all tickets
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [closed, open]
 *         required: false
 *         description: Status of ticket [closed or open]
 *       - in: query
 *         name: area
 *         schema:
 *           type: string
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page to get the tickets from
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Limit of tickets per page
 *       - in: query
 *         name: userRelation
 *         schema:
 *           type: string
 *           enum: ['created','observed']
 *         description: Relationship between user and ticket
 *     responses:
 *       200:
 *         description: Got tickets successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 tickets:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       area:
 *                         type: string
 *                         example: "Administrativa"
 *                       status:
 *                         type: string
 *                         enum: ["Novo", "Em Andamento", "Concluído"]
 *                         example: "Novo"
 *                       title:
 *                         type: string
 *                         example: "Preciso de Bolinhos de arroz"
 *                       description:
 *                         type: string
 *                         example: "Necessito deles urgentemente."
 *                       requesterId:
 *                         type: integer
 *                         example: 1
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-10-15T19:01:07.000Z"
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-12-15T19:01:07.000Z"
 *                       Owner:
 *                         type: object
 *                         properties: 
 *                           id:
 *                             type: integer
 *                             example: 1
 *                           name:
 *                             type: string
 *                             example: "Mathew Sant'anna"
 *                       Observers:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             id:
 *                               type: integer
 *                               example: 1
 *                             userId:
 *                               type: integer
 *                               example: 2
 *                             User:
 *                               type: object
 *                               properties:
 *                                 id:
 *                                   type: integer
 *                                   example: 2
 *                                 name:
 *                                   type: string
 *                                   example: "Daniel McFace"
 *       400:
 *         description: Error occurred while fetching tickets
 *       401:
 *         description: Unauthorized - token missing or invalid
 */
/**
 * @swagger
 * /tickets/{id}:
 *   get:
 *     tags: [Tickets]
 *     summary: Get ticket based on ID
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ticket ID
 *     responses:
 *       200:
 *         description: Got ticket by ID successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ticket:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     name:
 *                       type: string
 *                       example: "John Doe Smith"
 *                     cpf:
 *                       type: string
 *                       example: "12423534645"
 *                     area:
 *                       type: string
 *                       example: "Administrativa"
 *                     roleId:
 *                       type: number
 *                       example: 1
 *                     admin:
 *                       type: boolean
 *                       example: false
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-10-15T19:01:07.000Z"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-12-15T19:01:07.000Z"
 *                     Role:
 *                       type: object
 *                       properties: 
 *                         name:
 *                           type: string
 *                           example: "Assistente Administrativo"
 *       400:
 *         description: Error occurred while getting ticket by ID    
 *       401:
 *         description: Unauthorized - token missing or invalid
 */
/**
 * @swagger
 * /tickets/{id}:
 *   put:
 *     tags: [Tickets]
 *     summary: Update ticket based on ID
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ticket ID
 *     responses:
 *       200:
 *         description: Edited ticket by ID successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ticket:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     area:
 *                       type: string
 *                       example: "Administrativa"
 *                     title:
 *                       type: string
 *                       example: "Updated Title"
 *                     description:
 *                       type: string
 *                       example: "Updated Description"
 *                     requesterId:
 *                       type: integer
 *                       example: 1
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-10-15T19:01:07.000Z"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-12-15T19:01:07.000Z"
 *                     Owner:
 *                       type: object
 *                       properties: 
 *                         id:
 *                           type: integer
 *                           example: 1
 *                         name:
 *                           type: string
 *                           example: "Mathew Sant'anna"
 *       400:
 *         description: Error occurred while editing ticket
 *       401:
 *         description: Unauthorized - token missing or invalid
 */
/**
 * @swagger
 * /tickets/forward/{id}:
 *   patch:
 *     tags: [Tickets]
 *     summary: Forward ticket based on ID
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ticket ID
 *     responses:
 *       200:
 *         description: Forwarded ticket by ID successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ticket:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     name:
 *                       type: string
 *                       example: "John Doe Smith"
 *       400:
 *         description: Error occurred while forwarding ticket
 *       401:
 *         description: Unauthorized - token missing or invalid
 */
/**
 * @swagger
 * /tickets/close/{id}:
 *   patch:
 *     tags: [Tickets]
 *     summary: Close ticket based on ID
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ticket ID
 *     responses:
 *       200:
 *         description: Closed ticket by ID successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ticket:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     status:
 *                       type: string
 *                       enum: ["closed"]
 *                       example: "closed"
 *       400:
 *         description: Error occurred while closing ticket
 *       401:
 *         description: Unauthorized - token missing or invalid
 */
/**
 * @swagger
 * /tickets/{id}:
 *   delete:
 *     tags: [Tickets]
 *     summary: Delete ticket based on ID
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ticket ID
 *     responses:
 *       200:
 *         description: Deleted ticket by ID successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Ticket deleted successfully."
 *       400:
 *         description: Error occurred while deleting ticket
 *       401:
 *         description: Unauthorized - token missing or invalid
 */
