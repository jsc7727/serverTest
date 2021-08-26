
const { isString, isObject, isBoolean, isArray, isNotObjectEmpty } = require('../Constant/checkTypeOrEmpty');
const admin = require('firebase-admin');
const FieldValue = admin.firestore.FieldValue;

const joinRoom = async ({ db, roomId, nickname }) => {
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

const disconnectRoom = async ({ db, roomId, nickname }) => {
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


module.exports = { joinRoom, disconnectRoom }