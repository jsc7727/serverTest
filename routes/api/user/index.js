const router = require('express').Router()
const controller = require('./user.controller')

router.post('/checkUser', controller.checkUser);
router.post('/createUser', controller.createUser);
router.post('/deleteUserFromNickname', controller.deleteUserFromNickname);
router.post('/', controller.deleteUserFromNickname);



// deleteUserFromEmail 수정 중 
// router.post('/deleteUserFromEmail', controller.deleteUserFromEmail);


module.exports = router