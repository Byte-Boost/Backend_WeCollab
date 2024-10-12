const controller = require('../controllers/role.controller.js');
const router = require('express').Router();

router.get('/', controller.getRoles);
module.exports = router;