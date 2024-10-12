const controller = require('../controllers/area.controller.js');
const router = require('express').Router();

router.get('/', controller.getAreas);
module.exports = router;