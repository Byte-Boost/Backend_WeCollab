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
 * /accounts/register:
 *   post:
 *     tags: [Accounts]
 *     summary: Register an account
 *     security:
 *       - BearerAuth: []
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
 *       401:
 *         description: Unauthorized - token missing or invalid
 */
/**
 * @swagger
 * /accounts/login:
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
 *         description: Login successful. Use the returned token for authenticated requests.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       400:
 *         description: Error occurred on login
 *       401:
 *         description: Unauthorized
 */
/**
 * @swagger
 * /accounts/{id}:
 *   patch:
 *     tags: [Accounts]
 *     summary: Update an account
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The account ID
 *     requestBody:  
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
 *               username:
 *                 type: string 
 *               role:
 *                 type: string
 *               admin:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Account edited successfully
 *       400:
 *         description: Error occurred while editing account
 *       401:
 *         description: Unauthorized - token missing or invalid
 */
/**
 * @swagger
 * /accounts/{id}:
 *   delete:
 *     tags: [Accounts]
 *     summary: Delete a account
 *     security:
 *       - BearerAuth: []
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
 *       401:
 *         description: Unauthorized - token missing or invalid
 */
