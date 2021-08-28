const router = require('express').Router()
const controller = require('./room.controller')

router.post('/getRooms', controller.getRooms);
router.post('/getRoom', controller.getRoom);
router.post('/createRoom', controller.createRoom);
router.post('/accessRoom', controller.accessRoom);

module.exports = router