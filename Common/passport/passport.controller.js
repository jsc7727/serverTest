exports.NaverStrategyFunction = (accessToken, refreshToken, profile, done) => {
    var _profile = profile._json;
    loginByThirdparty({
        'auth_type': 'naver',
        'auth_id': _profile.id,
        'auth_name': _profile.nickname,
        'auth_email': _profile.email
    }, done);
}

exports.KakaoStrategyFunction = (accessToken, refreshToken, profile, done) => {
    var _profile = profile._json;
    loginByThirdparty({
        'auth_type': 'kakao',
        'auth_id': _profile.id,
        'auth_name': _profile.properties.nickname,
        'auth_email': _profile.id
    }, done);
}

exports.LocalStrategyFunction = (accessToken, refreshToken, profile, done) => {
    if (profile.username === "jsc" && profile.password === "1234") {
        done(null, { success: true });
    }
    else {
        done(null, { success: false });
    }
}