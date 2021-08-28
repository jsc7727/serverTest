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
        const dbCollectionRooms = db.collection("rooms")
        const res = await fireBaseUser.createUser({ userConfig })
        const users = JSON.stringify({ });
        res.send(users)
    } catch (error) {
        next(error)
    }
};
