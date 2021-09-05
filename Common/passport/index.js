const secret_config = require('../../config.js');
const NaverStrategy = require('passport-naver').Strategy;
const KakaoStrategy = require('passport-kakao').Strategy;
const LocalStrategy = require('passport-local').Strategy;

const {
    NaverStrategyFunction,
    KakaoStrategyFunction,
    LocalStrategyFunction
} = require('./passport.controller');

module.exports = (passport) => {


    passport.serializeUser(function (user, done) {
        console.log('passport session save: ', user);
        done(null, user);
    });

    passport.deserializeUser(function (id, done) {
        done(null, id)
    });

    passport.use(
        new NaverStrategy(
            {
                'clientID': secret_config.federation.naver.clientID,
                'clientSecret': secret_config.federation.naver.clientSecret,
                'callbackURL': '/api/auth/login/naver/callback',
            },
            NaverStrategyFunction
        )
    );

    passport.use(
        new KakaoStrategy(
            {
                'clientID': secret_config.federation.kakao.clientID,
                'callbackURL': '/api/auth/login/kakao/callback'
            },
            KakaoStrategyFunction
        )
    );

    passport.use(
        new LocalStrategy(
            LocalStrategyFunction
        )
    );

}

