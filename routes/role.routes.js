const controller = require('../controllers/role.controller.js');
const router = require('express').Router();

router.get('/', controller.getRoles);
module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Roles
 *   description: Role management
 */

/**
 * @swagger
 * /roles:
 *   get:
 *     tags: [Roles]
 *     summary: Get all roles
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Got all roles successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 roles:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       name:
 *                         type: string
 *                         example: "Assistente Administrativo"
 *       400:
 *         description: Error occurred while getting roles
 *       401:
 *         description: Unauthorized - token missing or invalid
 */
