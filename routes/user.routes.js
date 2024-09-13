const controller = require('../controllers/user.controller.js')
const router = require('express').Router();

router.post('/users', controller.getUsers);
router.post('/users', controller.getUsersByCPF);
router.post('/users', controller.getUsersById);
module.exports = router;