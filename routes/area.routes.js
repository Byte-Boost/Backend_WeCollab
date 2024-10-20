const controller = require('../controllers/area.controller.js');
const router = require('express').Router();

router.get('/', controller.getAreas);
module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Areas
 *   description: Area management
 */

/**
 * @swagger
 * /areas:
 *   get:
 *     tags: [Areas]
 *     summary: Get all areas
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Got all areas and their roles successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 areas:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                         example: "Administrativa"
 *                       roles:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             id:
 *                               type: integer
 *                               example: 1
 *                             name:
 *                               type: string
 *                               example: "Assistente Administrativo"
 *       400:
 *         description: Error occurred while getting areas
 *       401:
 *         description: Unauthorized - token missing or invalid
 */