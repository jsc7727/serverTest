const admin = require('firebase-admin');
const isString = (props) => {
    return typeof (props) === "string"
}

const isObject = (props) => {
    return typeof (props) === "Object"
}
const isBoolean = (props) => {
    return typeof (props) === "boolean"
}
const isArray = (props) => {
    return Array.isArray(props)
}

const createRoomsArgumentCheck = (room) => {
    const {
        hostname,
        guestNames,
        roomTitle,
        gameType,
        roomSecret,
        roomLimit,
    } = room;
    if (isString(hostname) &&
        isArray(guestNames) &&
        isString(roomTitle) &&
        isString(gameType) &&
        isObject(roomSecret) &&
        isNumber(roomLimit)) {
        return true
    }
    else {
        return false
    }
}
const createUsersArgumentCheck = (user) => {
    const {
        name,
        email,
        id,
        password,
        numberOfGames,
    } = user;
    if (
        isString(name) &&
        isString(email) &&
        isString(id) &&
        isString(password) &&
        isObject(numberOfGames)
    ) {
        return true;
    }
    else {
        return false;
    }

}

const createRooms = ({ db, room }) => {
    if (createRoomsArgumentCheck(room)) {
        const FieldValue = admin.firestore.FieldValue;
        const res = db.collection("rooms")
        const addReturn = await res.add({ ...room, timestamp: FieldValue.serverTimestamp() })
        console.log(addReturn)
    }
    else {
        console.error("createRoomsArgumentCheck error");
    }

}

const createUsers = ({ db, user }) => {
    if (createUsersArgumentCheck(user)) {
        const FieldValue = admin.firestore.FieldValue;
        const res = db.collection("users").doc(user.name)
        const setReturn = await res.set(user)
        const updateReturn = await res.update({ timestamp: FieldValue.serverTimestamp() })
        console.log(setReturn, updateReturn)
    }
    else {
        console.error("createUsersArgumentCheck error");
    }
}

module.exports = { createRooms, createUsers }