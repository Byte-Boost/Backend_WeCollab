const controller = require('../controllers/user.controller.js')
const adminMiddleware = require('../middleware/admin.middleware');
const router = require('express').Router();

router.post('/register', adminMiddleware, controller.registerUser);
router.post('/login', controller.loginUser);
router.patch('/:id', adminMiddleware, controller.updateUser);
router.delete('/:id', adminMiddleware, controller.deleteUser);
module.exports = router;
/**
 * @swagger
 * tags:
 *   name: Accounts
 *   description: Account management
 */

/**
 * @swagger
 * /register:
 *   post:
 *     tags: [Accounts]
 *     summary: Register an account
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
 *               roleId:
 *                 type: number
 *               admin:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Account registered successfully
 *       400:
 *         description: Error occurred while registering account
 */

/**
 * @swagger
 * /login:
 *   post:
 *     tags: [Accounts]
 *     summary: Login an account
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
 * /{id}:
 *   patch:
 *     tags: [Accounts]
 *     summary: Update an account
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The account ID
 *     requestBody:   # Correct indentation
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               area:
 *                 type: string 
 *               roleId:
 *                 type: number
 *               admin:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Account edited successfully
 *       400:
 *         description: Error occurred while editing account
 */
/**
 * @swagger
 * /{id}:
 *   delete:
 *     tags: [Accounts]
 *     summary: Delete a account
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The account ID
 *     responses:
 *       200:
 *         description: Account deleted successfully
 *       400:
 *         description: Error occurred while deleting account
 */