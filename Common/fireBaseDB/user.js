const { checkRoomStructure, checkUsersStructure } = require('./Constant/checkStructure');
const { isString, isObject, isBoolean, isArray } = require('./Constant/checkTypeOrEmpty');
const admin = require('firebase-admin');
const db = admin.firestore();
const FieldValue = admin.firestore.FieldValue;

exports.checkUserHasNickname = async ({ nickname }) => {
    let userHasNickname = false;
    let snapshot = { };
    let userList = [];
    console.log(nickname)
    if (isString(nickname)) {
        console.log("asdf1")
        const userRef = db.collection('users');
        snapshot = await userRef.where('nickname', "==", nickname).get();
        console.log(snapshot.empty)
        if (!snapshot.empty) {
            console.log("asdf2")
            userHasNickname = true;
            snapshot.forEach(doc => {
                userList.push(doc.data());
            });
        }
    }
    else {
        console.error("getUserFromId error");
    }
    return { userList, userHasNickname };
}

exports.createUser = async ({ user }) => {
    try {
        if (checkUsersStructure(user)) {
            const {
                nickname,
                usingSns,
                snsUserAttributes,
                localUserAttributes,
                numberOfGames,
                report,
            } = user;
            if (!(await this.checkUserHasNickname({ nickname })).userHasNickname) {
                const res = db.collection("users").doc(nickname);
                const setReturn = await res.set({
                    nickname,
                    usingSns,
                    snsUserAttributes,
                    localUserAttributes,
                    numberOfGames,
                    report,
                });
                const updateReturn = await res.update({ timestamp: FieldValue.serverTimestamp() })
                // console.log(setReturn, updateReturn)
                return { success: true }
            }
            else {
                return { success: false }
            }
        }
        else {
            console.error("createUsersArgumentCheck error");
            return { success: false }
        }
    }
    catch (error) {
        console.error(error);
        return { success: false }
    }

}

exports.deleteUserFromEmail = async ({ email }) => {
    // 수정중
    try {
        if (isString(nickname)) {
            const result = await db.collection('users').doc(email).delete();
            console.log("deleteUser : ", result._writeTime);
        }
        else {
            console.error("deleteUser error");
        }
    }
    catch (error) {
        console.error(error);
    }
}

exports.deleteUserFromNickname = async ({ nickname }) => {
    try {
        if (isString(nickname)) {
            const result = await db.collection('users').doc(nickname).delete();
            console.log("deleteUser : ", result._writeTime);
        }
        else {
            console.error("deleteUser error");
        }
    }
    catch (error) {
        console.error(error);
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