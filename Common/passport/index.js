const secret_config = require('../../config.js');
const NaverStrategy = require('passport-naver').Strategy;
const KakaoStrategy = require('passport-kakao').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const { isString, isObject, isBoolean, isArray } = require('../fireBaseDB/Constant/checkTypeOrEmpty');


const { getSnsInUser, getUserFromNickname, checkLocalLogin, getUserFromEmail, createUser, isDuplicateEmail, createUserForSns } = require("../fireBaseDB/user");

module.exports = (passport) => {
    passport.serializeUser(function (user, done) {
        console.log('passport session save: ', user.email);
        done(null, user.email);
    });

    passport.deserializeUser(async (email, done) => {
        console.log("deserializeUser : ", email);
        // if (nickname !== undefined) {
        //     const returnValueFromDb = await getUserFromNickname({ nickname });
        //     done(null, returnValueFromDb.user)
        // }
        // const returnValueFromDb = await getUserFromNickname({ nickname });
        const returnValueFromDb = await getUserFromEmail({ email });
        done(null, returnValueFromDb.user)
    });

    passport.use(
        new NaverStrategy(
            {
                'clientID': secret_config.federation.naver.clientID,
                'clientSecret': secret_config.federation.naver.clientSecret,
                'callbackURL': '/api/auth/login/naver/callback',
                passReqToCallback: true,
            },
            async (req, accessToken, refreshToken, profile, done) => {
                console.log("profile : ", profile);
                console.log("req.isAuthenticated() : ", req.isAuthenticated())
                // console.log('req : ', req)
                console.log(req.protocol + '://' + req.get('host') + "||||" + req.originalUrl)
                var _profile = profile._json;
                const { provider } = profile;
                const { id, email } = profile._json;
                console.log(provider, id, email);
                if (isString(provider) &&
                    isString(id) &&
                    isString(email)) {
                    const { user, success } = await getSnsInUser({ id, provider });
                    const { duplicate } = await isDuplicateEmail({ email })
                    if (success) {
                        // sns??? ????????? ????????? ?????? ???
                        done(null, { nickname: user.nickname, email: user.email });
                    }
                    else {
                        // sns??? ????????? ????????? ?????? ???
                        if (!duplicate) {
                            // ???????????? ???????????? ???????????? ????????????.
                            const { success } = await createUserForSns({
                                user: {
                                    email,
                                    sns: { provider, id }
                                }
                            })
                            if (success) {
                                // ???????????? ????????????
                                done(null, { nickname: "", email })
                            }
                            else {
                                // ???????????? ????????????
                                done("????????? ?????? ???????????? ??????", false);
                            }
                        }
                        else {
                            // ???????????? ?????????????????? ????????? ?????? ??? ???????????? ??????
                            done("????????? ?????? : ?????? ???????????? ????????? ????????? ????????????.", false);
                        }
                    }
                }
                else {
                    done("????????? ?????? : ???????????? ???????????? ?????????.");
                }

            }
        )
    );

    passport.use(
        new KakaoStrategy(
            {
                'clientID': secret_config.federation.kakao.clientID,
                'callbackURL': '/api/auth/login/kakao/callback',
                passReqToCallback: true
            },
            async (req, accessToken, refreshToken, profile, done) => {
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
                    done("????????? ?????? : ?????? ??? ????????? ????????????.");
                }
            }
        )
    );

    passport.use(
        new LocalStrategy(
            {
                usernameField: 'nickname',
                passwordField: 'password',
                passReqToCallback: true //????????? ???????????? ?????? ????????? HTTP request??? ?????????  ???????????? ????????? ????????????
            },
            async (req, nickname, password, done) => {
                const { user, success } = await checkLocalLogin({ nickname, password });
                if (success) {
                    console.log("?????? ????????? ??????");
                    done(null, user);
                }
                else {
                    console.log("?????? ????????? ??????");
                    done("????????? ???! ???!");
                }
            }
        )
    );
}

