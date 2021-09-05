const passport = require('passport');
const router = require('express').Router()

router.get('/login/naver',
    passport.authenticate('naver')
);
// naver 로그인 연동 콜백
router.get('/login/naver/callback',
    passport.authenticate('naver', {
        successRedirect: '/성공',
        failureRedirect: '/api/auth/login',
        session: true,
    })
);

// kakao 로그인
router.get('/login/kakao',
    passport.authenticate('kakao')
);
// kakao 로그인 연동 콜백
router.get('/login/kakao/callback',
    passport.authenticate('kakao', {
        successRedirect: '/성공',
        failureRedirect: '/api/auth/login'
    })
);


// 로컬 로그인
router.get('/login/local',
    passport.authenticate('local',
        (error, user, info) => {
            if (user) {
                console.log("로그인 성공");
            }
            else {
                console.log("로그인 실패");
            }
        })
);
// kakao 로그인 연동 콜백
router.get('/login/local/callback',
    passport.authenticate('kakao', {
        successRedirect: '/',
        failureRedirect: '/login'
    })
);

module.exports = router;