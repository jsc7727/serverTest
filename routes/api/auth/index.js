const passport = require('passport');
const router = require('express').Router()

router.get('/login/naver',
    passport.authenticate('naver')
);
// naver 로그인 연동 콜백
router.get('/login/naver/callback',
    passport.authenticate('naver', {
        successRedirect: '/api/auth/login',
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
router.post('/login',
    passport.authenticate('local', {
        successRedirect: '/api/auth/login',
        failureRedirect: '/api/auth/login',
    }), // 인증실패시 401 리턴, {} -> 인증 스트레티지
    (req, res) => {
        res.redirect('/api/auth/login');
    }
);

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/api/auth/login');
});



module.exports = router;