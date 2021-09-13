const secret_config = require('../../config.js');
const NaverStrategy = require('passport-naver').Strategy;
const KakaoStrategy = require('passport-kakao').Strategy;
const LocalStrategy = require('passport-local').Strategy;

const { getSnsInUser, getUserFromNickname, checkLocalLogin } = require("../fireBaseDB/user");

module.exports = (passport) => {
    passport.serializeUser(function (user, done) {
        console.log('passport session save: ', user.nickname);
        done(null, user.nickname);
    });

    passport.deserializeUser(async (nickname, done) => {
        console.log("deserializeUser : ", nickname);
        const returnValueFromDb = await getUserFromNickname({ nickname });
        done(null, returnValueFromDb.user)
    });

    passport.use(
        new NaverStrategy(
            {
                'clientID': secret_config.federation.naver.clientID,
                'clientSecret': secret_config.federation.naver.clientSecret,
                'callbackURL': '/api/auth/login/naver/callback',
            },
            async (accessToken, refreshToken, profile, done) => {
                console.log("profile : ", profile);
                var _profile = profile._json;
                const { provider } = profile;
                const { id } = profile._json;
                console.log(provider, id)
                const { user, success } = await getSnsInUser({ id, provider });
                console.log(user, success)
                if (success) {
                    done(null, { nickname: user.nickname, email: user.email });
                }
                else {
                    done("로그인 실패 : 가입 된 계정이 없습니다.");
                }
            }
        )
    );

    passport.use(
        new KakaoStrategy(
            {
                'clientID': secret_config.federation.kakao.clientID,
                'callbackURL': '/api/auth/login/kakao/callback'
            },
            async (accessToken, refreshToken, profile, done) => {
                console.log("profile : ", profile);
                var _profile = profile._json;
                const provider = String(profile.provider);
                const id = String(profile.id);
                console.log(provider, id)
                const { user, success } = await getSnsInUser({ id, provider });
                console.log(user, success)
                if (success) {
                    done(null, { nickname: user.nickname, email: user.email });
                }
                else {
                    done("로그인 실패 : 가입 된 계정이 없습니다.");
                }
            }
        )
    );

    passport.use(
        new LocalStrategy(
            {
                usernameField: 'nickname',
                passwordField: 'password',
                passReqToCallback: true //인증을 수행하는 인증 함수로 HTTP request를 그대로  전달할지 여부를 결정한다
            },
            async (req, nickname, password, done) => {
                const { user, success } = await checkLocalLogin({ nickname, password });
                if (success) {
                    console.log("로컬 로그인 성공");
                    done(null, user);
                }
                else {
                    console.log("로컬 로그인 실패");
                    done("로그인 실! 패!");
                }
            }
        )
    );
}

