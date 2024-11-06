const controller = require('../controllers/data.controller.js');
const router = require('express').Router();

// Data routes
router.get('/completedRatio', controller.getFinishedRatio);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Data
 *   description: system data and stats management
 */

/**
 * @swagger
 * /data/completedRatio:
 *   get:
 *     tags: [Data]
 *     summary: Get ratio of completed tickets
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: area
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Got data successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ratio:
 *                   type: integer
 *                   example: 0.5
 *                 concluido:
 *                   type: integer
 *                   example: 5
 *                 total:
 *                   type: integer
 *                   example: 10
 *       400:
 *         description: Error occurred while fetching data
 *       401:
 *         description: Unauthorized - token missing or invalid
 */