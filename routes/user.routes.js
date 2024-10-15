const controller = require('../controllers/user.controller.js');
const adminMiddleware = require('../middleware/admin.middleware.js');
const router = require('express').Router();

router.get('/', controller.getUsers);
router.get('/cpf/:cpf', adminMiddleware, controller.getUsersByCPF);
router.get('/:id', adminMiddleware, controller.getUsersById);
module.exports = router;