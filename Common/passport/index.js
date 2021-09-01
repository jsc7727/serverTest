const secret_config = require('../../config.js');
const passport = require('passport');
const NaverStrategy = require('passport-naver').Strategy;
const KakaoStrategy = require('passport-kakao').Strategy;
const LocalStrategy = require('passport-local').Strategy;

const {
    NaverStrategyFunction,
    KakaoStrategyFunction,
    LocalStrategyFunction
} = require('./passport.controller');

module.exports = () => {
    passport.use(
        new NaverStrategy(
            { ...secret_config.federation.naver },
            NaverStrategyFunction
        )
    );

    passport.use(
        new KakaoStrategy(
            { ...secret_config.federation.kakao },
            KakaoStrategyFunction
        )
    );

    passport.use(
        new LocalStrategy(
            LocalStrategyFunction
        )
    );
}

