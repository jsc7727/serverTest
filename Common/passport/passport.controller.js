exports.NaverStrategyFunction = (accessToken, refreshToken, profile, done) => {
    var _profile = profile._json;
    // loginByThirdparty({
    //     'auth_type': 'naver',
    //     'auth_id': _profile.id,
    //     'auth_name': _profile.nickname,
    //     'auth_email': _profile.email
    // }, done);
    // const auth_type = 'naver';
    // const auth_id = profile.id;
    // const auth_name = profile.nickname;
    // const auth_email = profile.email;

    // return {
    //     error: null,
    //     user: {
    //         user_id: auth_id,
    //         nickname: auth_name
    //     }
    // }
    console.log(profile)
    done(null, "asdf");
    // User.findOne({
    //     'naver.id': profile.id
    // }, function (err, user) {
    //     if (!user) {
    //         user = new User({
    //             name: profile.displayName,
    //             email: profile.emails[0].value,
    //             username: profile.displayName,
    //             provider: 'naver',
    //             naver: profile._json
    //         });
    //         user.save(function (err) {
    //             if (err) console.log(err);
    //             return done(err, user);
    //         });
    //     } else {
    //         return done(err, user);
    //     }
    // });
}

exports.KakaoStrategyFunction = (accessToken, refreshToken, profile, done) => {
    var _profile = profile._json;
    console.log(profile)
    console.log(accessToken, refreshToken)
    done(null, "asdf");
}

exports.LocalStrategyFunction = (accessToken, refreshToken, profile, done) => {
    if (profile.username === "jsc" && profile.password === "1234") {
        done(null, { success: true });
    }
    else {
        done(null, { success: false });
    }
}