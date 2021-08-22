const admin = require('firebase-admin');
const isString = (props) => {
    return typeof (props) === "string" && props !== undefined
}

const isObject = (props) => {
    return typeof (props) === "Object" && props !== undefined
}
const isBoolean = (props) => {
    return typeof (props) === "boolean" && props !== undefined
}
const isArray = (props) => {
    console.log("isArray ", props)
    return Array.isArray(props) && props !== undefined
}

const createRoomsArgumentCheck = (room) => {
    const {
        hostname,
        guestNames,
        roomTitle,
        gameType,
        play,
        secret,
        password,
        roomLimit,
    } = room;
    if (isString(hostname) &&
        isArray(guestNames) &&
        isString(roomTitle) &&
        isString(gameType) &&
        isBoolean(play) &&
        isBoolean(secret) &&
        isString(password) &&
        isNumber(roomLimit)) {
        return true
    }
    else {
        return false
    }
}
const createUsersArgumentCheck = (user) => {
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

const createRoom = async ({ db, room }) => {
    if (createRoomsArgumentCheck(room)) {
        const {
            hostname,
            guestNames,
            roomTitle,
            gameType,
            play,
            secret,
            password,
            roomLimit,
        } = room;
        const FieldValue = admin.firestore.FieldValue;
        const res = db.collection("rooms");
        const addReturn = await res.add({
            hostname,
            guestNames,
            roomTitle,
            gameType,
            play,
            secret,
            password,
            roomLimit,
            timestamp: FieldValue.serverTimestamp()
        })
        console.log(addReturn)
    }
    else {
        console.error("createRoomsArgumentCheck error");
    }
    return addReturn;

}

const createUser = async ({ db, user }) => {
    if (createUsersArgumentCheck(user)) {
        const {
            nickname,
            email,
            password,
            numberOfGames,
            report,
        } = user;
        const FieldValue = admin.firestore.FieldValue;
        const res = db.collection("users").doc(user.email);
        const setReturn = await res.set({
            nickname,
            email,
            password,
            numberOfGames,
            report
        });
        const updateReturn = await res.update({ timestamp: FieldValue.serverTimestamp() })
        console.log(setReturn, updateReturn)
    }
    else {
        console.error("createUsersArgumentCheck error");
    }
}

module.exports = { createRoom, createUser }