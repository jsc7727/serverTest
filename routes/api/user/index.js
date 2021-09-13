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

router.get('/joinSns', isLoggedIn, controller.joinSns)


router.post('/joinSns', isLoggedIn,
    (req, res, next) => {
        console.log(req.user);
        
        next();
    }
);


module.exports = router