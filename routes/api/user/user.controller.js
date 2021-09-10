const fireBaseUser = require('../../../Common/fireBaseDB/user');

exports.getUser = async (req, res, next) => {
    try {
        console.log("getUser Session : ", req.session);
        // console.log("getUser from db data  : ", req);
        const email = req.query['email'];
        console.log("getUser email ", email)
        const { user, success } = await fireBaseUser.getUserFromEmail({ email });
        const jsonUser = JSON.stringify({ user, success });
        res.send(jsonUser)
    } catch (error) {
        const jsonUser = JSON.stringify({ user: {}, success: false });
        res.send(jsonUser)
        next(error)
    }
};

exports.getUserFromNickname = async (req, res, next) => {
    try {
        const nickname = req.query['nickname'];
        const { user, success } = await fireBaseUser.getUserFromNickname({ nickname });
        const jsonUser = JSON.stringify({ user, success });
        res.send(jsonUser)
    } catch (error) {
        const jsonUser = JSON.stringify({ user: {}, success: false });
        res.send(jsonUser)
        next(error)
    }
};

exports.checkNicknameDuplication = async (req, res, next) => {
    try {
        const nickname = req.query.nickname;
        const createUserResult = await fireBaseUser.checkNicknameDuplication({ nickname })
        const createUserResultJson = JSON.stringify(createUserResult);
        res.send(createUserResultJson)
    } catch (error) {
        next(error)
    }
}
exports.checkEmailDuplication = async (req, res, next) => {
    try {
        const email = req.query.email;
        const createUserResult = await fireBaseUser.checkEmailDuplication({ email })
        const createUserResultJson = JSON.stringify(createUserResult);
        res.send(createUserResultJson)
    } catch (error) {
        next(error)
    }
}

exports.createUser = async (req, res, next) => {
    try {
        const userConfig = req.body;
        const createUserResult = await fireBaseUser.createUser({ user: userConfig })
        const createUserResultJson = JSON.stringify(createUserResult);
        res.send(createUserResultJson)
    } catch (error) {
        next(error)
    }
};

exports.deleteUserFromEmail = async (req, res, next) => {
    // 수정중
    try {
        const email = req.body['email'];
        const deleteUserResult = await fireBaseUser.deleteUserFromEmail({ email })
        const deleteUserResultJson = JSON.stringify(deleteUserResult);
        res.send(deleteUserResultJson)
    } catch (error) {
        next(error)
    }
};

exports.deleteUserFromNickname = async (req, res, next) => {
    try {
        const nickname = req.body['nickname'];
        const deleteUserResult = await fireBaseUser.deleteUserFromNickname({ nickname })
        const deleteUserResultJson = JSON.stringify(deleteUserResult);
        res.send(deleteUserResultJson)
    } catch (error) {
        next(error)
    }
};

// exports.duplicateNickname = async (req, res, next) => {
//     try {
//         const nickname = req.params['nickname'];
//         const deleteUserResult = await fireBaseUser.checkNicknameDuplication({ nickname })
//         const deleteUserResultJson = JSON.stringify(deleteUserResult);
//         res.send(deleteUserResultJson)
//     } catch (error) {
//         next(error)
//     }
// };

// exports.duplicateEmail = async (req, res, next) => {
//     try {
//         const email = req.params['email'];
//         const deleteUserResult = await fireBaseUser.checkEmailDuplication({ email })
//         const deleteUserResultJson = JSON.stringify(deleteUserResult);
//         res.send(deleteUserResultJson)
//     } catch (error) {
//         next(error)
//     }
// };




