const router = require('express').Router()
const controller = require('./user.controller')
const { isLoggedIn, isNotLoggedIn } = require('../../middleWare');

router.get('/getUser', isLoggedIn, controller.getUser);
router.get('/getUserFromNickname', controller.getUserFromNickname);
router.post('/createUser', isNotLoggedIn, controller.createUser);

router.post('/deleteUserFromEmail', controller.deleteUserFromEmail);
router.post('/deleteUserFromNickname', controller.deleteUserFromNickname);

router.get('/checkEmailDuplication', controller.checkEmailDuplication);
router.get('/checkNicknameDuplication', controller.checkNicknameDuplication);

// router.post('/checkUser', controller.checkUser);
// router.post('/createUser', controller.createUser);
// router.post('/deleteUserFromNickname', controller.deleteUserFromNickname);



// deleteUserFromEmail 수정 중 
// router.post('/deleteUserFromEmail', controller.deleteUserFromEmail);


module.exports = router