const router = require('express').Router()
const controller = require('./user.controller')

router.post('/checkUser', controller.checkUser);
router.post('/createUser', controller.createUser);

module.exports = router