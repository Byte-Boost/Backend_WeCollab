const controller = require('../controllers/user.controller.js');
const adminMiddleware = require('../middleware/admin.middleware.js');
const router = require('express').Router();

router.get('/', controller.getUsers);
router.get('/cpf/:cpf', adminMiddleware, controller.getUsersByCPF);
router.get('/:id', adminMiddleware, controller.getUsersById);
router.put('/:id/reset-password', adminMiddleware, controller.resetPassword);
router.put('/:id/update-password', controller.updatePassword);
module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management
 */

/**
 * @swagger
 * /users/:
 *   get:
 *     tags: [Users]
 *     summary: Get all users
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Got all users successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 users:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       name:
 *                         type: string
 *                         example: "John Doe Smith"
 *                       cpf:
 *                         type: string
 *                         example: "12423534645"
 *                       area:
 *                         type: string
 *                         example: "Administrativa"
 *                       username:
 *                         type: string
 *                         example: "Johnnysmith"
 *                       roleId:
 *                         type: number
 *                         example: 1
 *                       admin:
 *                         type: boolean
 *                         example: false
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-10-15T19:01:07.000Z"
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-12-15T19:01:07.000Z"
 *                       Role:
 *                         type: object
 *                         properties: 
 *                           name:
 *                              type: string
 *                              example: "Assistente Administrativo"
 *       400:
 *         description: Error occurred while fetching users
 *       401:
 *         description: Unauthorized - token missing or invalid
 */

/**
 * @swagger
 * /users/cpf/{cpf}:
 *   get:
 *     tags: [Users]
 *     summary: Get user based on CPF
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: cpf
 *         required: true
 *         schema:
 *           type: integer
 *         description: The user CPF
 *     responses:
 *       200:
 *         description: Got user by CPF successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       name:
 *                         type: string
 *                         example: "John Doe Smith"
 *                       cpf:
 *                         type: string
 *                         example: "12423534645"
 *                       area:
 *                         type: string
 *                         example: "Administrativa"
 *                       username:
 *                         type: string
 *                         example: "Johnnysmith"
 *                       roleId:
 *                         type: number
 *                         example: 1
 *                       admin:
 *                         type: boolean
 *                         example: false
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-10-15T19:01:07.000Z"
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-12-15T19:01:07.000Z"
 *                       Role:
 *                         type: object
 *                         properties: 
 *                           name:
 *                             type: string
 *                             example: "Assistente Administrativo"
 *       401:
 *         description: Unauthorized - token missing or invalid
 */
/**
 * @swagger
 * /users/{id}:
 *   get:
 *     tags: [Users]
 *     summary: Get user based on ID
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The user ID
 *     responses:
 *       200:
 *         description: Got user by ID successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 users:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       name:
 *                         type: string
 *                         example: "John Doe Smith"
 *                       cpf:
 *                         type: string
 *                         example: "12423534645"
 *                       area:
 *                         type: string
 *                         example: "Administrativa"
 *                       username:
 *                         type: string
 *                         example: "Johnnysmith"
 *                       roleId:
 *                         type: number
 *                         example: 1
 *                       admin:
 *                         type: boolean
 *                         example: false
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-10-15T19:01:07.000Z"
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-12-15T19:01:07.000Z"
 *                       Role:
 *                         type: object
 *                         properties: 
 *                           name:
 *                              type: string
 *                              example: "Assistente Administrativo"
 *       400:
 *         description: Error occurred while editing account
 *       401:
 *         description: Unauthorized - token missing or invalid
 */
/**
 * @swagger
 * /users/{id}/reset-password:
 *   put:
 *     summary: Resets a user's password to a default password
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: user id
 *     responses:
 *       200:
 *         description: Password reset successfully
 *       500:
 *         description: Error resetting password
 * 
 * /users/{id}/update-password:
 *   put:
 *     summary: Update a user's password after checking the current password
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: user id
 *       - in: body
 *         name: password
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             currentPassword:
 *               type: string
 *               example: "currentPassword"
 *             newPassword:
 *               type: string
 *               example: "newPassword"
 *     responses:
 *       200:
 *         description: Password updated successfully
 *       401:
 *         description: Current password incorrect
 *       500:
 *         description: Error updating password
 */