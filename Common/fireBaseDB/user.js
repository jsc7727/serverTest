const { checkRoomStructure, checkUsersStructure } = require('./Constant/checkStructure');
const { isString, isObject, isBoolean, isArray } = require('./Constant/checkTypeOrEmpty');
const admin = require('firebase-admin');
const db = admin.firestore();
const FieldValue = admin.firestore.FieldValue;

exports.createUser = async ({ user }) => {
    if (checkUsersStructure(user)) {
        const {
            nickname,
            email,
            password,
            numberOfGames,
            report,
        } = user;
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

exports.deleteUser = async ({ email }) => {
    if (isString(email)) {
        const result = await db.collection('users').doc(email).delete();
        console.log("deleteUser : ", result._writeTime)
    }
    else {
        console.error("deleteUser error");
    }
}


exports.getUserFromEmail = async ({ email }) => {
    let success = false;
    let result = { };
    if (isString(email)) {
        const userRef = db.collection('users');
        result = await userRef.where('email', "==", email).get();
        if (!result.empty) {
            success = true;
        }
    }
    else {
        console.error("getUserFromId error");
    }
    return { userList: result, success };
}