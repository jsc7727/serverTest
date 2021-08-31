const fireBaseUser = require('../../../Common/fireBaseDB/user');

exports.checkUser = async (req, res, next) => {
    try {
        const email = req.body['email'];
        console.log
        const { user, success } = await fireBaseUser.getUserFromEmail({ email });
        const jsonUser = JSON.stringify({ user, success });
        res.send(jsonUser)
    } catch (error) {
        next(error)
    }
};

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



