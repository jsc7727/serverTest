const passport = require('passport');
const router = require('express').Router()

router.get('/login/naver',
    passport.authenticate('naver')
);
// naver 로그인 연동 콜백
router.get('/login/naver/callback',
    passport.authenticate('naver', {
        successRedirect: '/',
        failureRedirect: '/login'
    })
);

// kakao 로그인
router.get('/login/kakao',
    passport.authenticate('kakao')
);
// kakao 로그인 연동 콜백
router.get('/login/kakao/callback',
    passport.authenticate('kakao', {
        successRedirect: '/',
        failureRedirect: '/login'
    })
);


// 로컬 로그인
router.get('/login/local',
    passport.authenticate('kakao')
);
// kakao 로그인 연동 콜백
router.get('/login/kakao/callback',
    passport.authenticate('kakao', {
        successRedirect: '/',
        failureRedirect: '/login'
    })
);

module.exports = router;