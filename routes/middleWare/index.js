exports.isLoggedIn = function (req, res, next) {
    if (req.isAuthenticated()) {
        next();
    }
    else {
        // res.status(403).send('로그인 필요');
        res.redirect("/auth/login");
    }
};

exports.isNotLoggedIn = function (req, res, next) {
    if (!req.isAuthenticated()) {
        next();
    }
    else {
        res.redirect("/");
    }
};
