const { checkRoomStructure, checkUsersStructure } = require('./Constant/checkStructure');
const { isString, isObject, isBoolean, isArray } = require('./Constant/checkTypeOrEmpty');
const admin = require('firebase-admin');
const db = admin.firestore();
const FieldValue = admin.firestore.FieldValue;
const crypto = require('crypto')
exports.createRoom = async ({ room }) => {
    try {
        if (checkRoomStructure(room)) {
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
            const res = db.collection("rooms");
            const encrypted = crypto.createHmac('sha1', config.secret)
                      .update(password)
                      .digest('base64')
            const addReturn = await res.add({
                hostname,
                guestList,
                roomTitle,
                gameType,
                play,
                secret,
                password,
                roomLimit,
                timestamp: FieldValue.serverTimestamp()
            })
            console.log("check room")
            return { roomId: addReturn.id, success: true };
        } else {
            return { roomId: "", success: false };
        }
    }
    catch {
        console.error("createRoom catch error");
        console.log(error)
    }
}

exports.deleteRoom = async ({ roomId }) => {
    if (isString(roomId)) {
        const result = await db.collection('rooms').doc(roomId).delete();
        console.log(result)
    }
    else {
        console.error("deleteRoom error");
    }
}

exports.getListOfRooms = async () => {
    const result = await db.collection('rooms').get()
    const roomList = result.docs.map(doc => {
        const { password, ...e } = doc.data();
        return { ...e, roomId: doc.id }
    })
    return { roomList, success: !result.empty };
}

exports.getObjectOfRoom = async ({ roomId }) => {
    let success = false;
    let result = { };
    if (isString(roomId)) {
        result = await db.collection('rooms').doc(roomId).get();
        if (!result.empty) {
            success = true;
        }
        // console.log("get Object Of Room : ", result)
    }
    else {
        console.error("getObjectOfRoom error");
    }
    return { roomObject: result.data(), success };
}



exports.joinRoom = async ({ roomId, nickname }) => {
    try {
        if (isString(roomId) &&
            isString(nickname)) {
            result = await db.collection('rooms').doc(roomId).update({
                guestList: FieldValue.arrayUnion(nickname)
            });
            return { success: true };
        }
        else {
            console.error("joinRoom error");
            return { success: false };
        }
    }
    catch (error) {
        console.error(error);
        return { success: false };
    }
}

exports.disconnectRoom = async ({ roomId, nickname }) => {
    try {
        if (isString(roomId) &&
            isString(nickname)) {
            result = await db.collection('rooms').doc(roomId).update({
                guestList: FieldValue.arrayRemove(nickname)
            });
            return { success: true };
        }
        else {
            console.error("disconnectRoom error");
            return { success: false };
        }
    }
    catch (error) {
        console.error(error);
        return { success: false };
    }
}