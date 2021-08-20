
const { isString, isObject, isBoolean, isArray, isNotObjectEmpty } = require('../Constant/checkArgument');
const getListOfRooms = async ({ db }) => {
    let success = false;
    const result = await db.collection('rooms').get()

    if (!result.exists) {
        success = true;
    }

    console.log("asdfqwer :", await db.collection('rooms').doc('1tg15Jrfzuq8KQQruA9d').get())
    console.log("-------------------------------------")
    return [result.docs, success];
}

// const getDataOfRoom = async ({ db, roomId }) => {
//     let success = false;
//     let result = {};
//     if (isString(roomId)) {
//         result = await db.collection('rooms').listCollections();
//         if (isNotObjectEmpty(result)) {
//             success = true;
//         }
//         console.log("get rooms : ", result)
//     }
//     else {
//         console.error("getRooms error");
//     }
//     return [result, success];
// }

const getUserFromEmail = async ({ db, email }) => {
    let success = false;
    let result = {};
    if (isString(email)) {
        const userRef = db.collection('email')
        result = await userRef.where('email', "==", email)
        if (isNotObjectEmpty(result)) {
            success = true;
        }
        // console.log("get users : ", result)
    }
    else {
        console.error("getUserFromId error");
    }
    return [result, success];
}
module.exports = { getListOfRooms, getUserFromEmail }