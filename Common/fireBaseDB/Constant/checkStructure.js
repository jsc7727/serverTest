const { isString, isObject, isBoolean, isArray, isNumber } = require('../Constant/checkTypeOrEmpty');
const checkRoomStructure = (room) => {
    try {
        const {
            hostname,
            guestList,
            roomTitle,
            gameType,
            play,
            secret,
            password,
            roomLimit,
        } = room;
        if (isString(hostname) &&
            isArray(guestList) &&
            isString(roomTitle) &&
            isString(gameType) &&
            isBoolean(play) &&
            isBoolean(secret) &&
            isString(password) &&
            isNumber(roomLimit)) {
            return true
        }
        else {
            return false;
        }
    } catch (error) {
        console.log("checkRoomStructure catch error");
        console.log(error)
        return false;
    }
}

const checkUsersStructure = (user) => {
    try {
        const {
            nickname,
            email,
            password,
            numberOfGames,
            report,
        } = user;
        if (
            isString(nickname) &&
            isString(email) &&
            isString(password) &&
            isObject(numberOfGames) &&
            isObject(report)
        ) {
            return true;
        }
        else {
            return false;
        }
    }
    catch (error) {
        console.log("checkUsersStructure catch error")
        return false;

    }
}

module.exports = { checkRoomStructure, checkUsersStructure }