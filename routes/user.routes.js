const controller = require('../controllers/user.controller.js')
const router = require('express').Router();

router.get('/', controller.getUsers);
router.get('/cpf/:cpf', controller.getUsersByCPF);
router.get('/:id', controller.getUsersById);
module.exports = router;