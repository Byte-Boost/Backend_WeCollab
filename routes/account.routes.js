const controller = require('../controllers/account.controller.js')
const adminMiddleware = require('../middleware/admin.middleware');
const router = require('express').Router();

router.post('/register', adminMiddleware, controller.registerUser);
router.post('/login', controller.loginUser);
router.put('/:id', adminMiddleware, controller.updateUser);
router.delete('/:id', adminMiddleware, controller.deleteUser);
module.exports = router;
/**
 * @swagger
 * tags:
 *   name: Account
 *   description: Account management
 */

/**
 * @swagger
 * /register:
 *   post:
 *     tags: [Account]
 *     summary: Register a new seller
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               cpf:
 *                 type: string
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Seller registered successfully
 *       400:
 *         description: Error occurred while registering seller
 */

/**
 * @swagger
 * /login:
 *   post:
 *     tags: [Account]
 *     summary: Login a seller
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /delete/{id}:
 *   delete:
 *     tags: [Account]
 *     summary: Delete a seller
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The seller ID
 *     responses:
 *       200:
 *         description: Seller deleted successfully
 *       400:
 *         description: Error occurred while deleting seller
 */
