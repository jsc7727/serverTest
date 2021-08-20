const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
const socket = require("socket.io");
const io = socket(server);
const socketModule = require("./Common/socketMoudle");
const admin = require('firebase-admin');
const serviceAccount = require('./startplayup-b27e5-5a7e25ff021b.json');
const users = require("./Common/fireBaseDB/Create/test/users");
const rooms = require("./Common/fireBaseDB/Create/test/rooms");
const { deleteUser, deleteRoom } = require("./Common/fireBaseDB/Delete/Delete")

const { getUserFromEmail, getListOfRooms } = require("./Common/fireBaseDB/Read/Read")



socketModule({ io });

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});
const db = admin.firestore();

// console.log(users)
const FieldValue = admin.firestore.FieldValue;
// users.forEach(async user => {
//     const a = db.collection("users").doc(user.email)
//     const test1 = await a.set(user)
//     const test2 = await a.update({ timestamp: FieldValue.serverTimestamp() })
//     // console.log(test1, test2)
// });

// rooms.forEach(async i => {
//     const a = db.collection("rooms")
//     const test1 = await a.add({ ...i, timestamp: FieldValue.serverTimestamp() })
//     // console.log(test1)
// });

deleteUser({ db, email: "test1@google.com" });

console.log(getListOfRooms)
const testRead = async () => {
    const [roomsData, roomsSuccess] = await getListOfRooms({ db });
    console.log("getRooms : ", roomsData[0], roomsData[0].data(), roomsData[0]._fieldsProto, roomsSuccess)

    const [userData, userSuccess] = await getUserFromEmail({ db, email: "test2@google.com" });
    // console.log("getUserFromEmail : ", userData, userSuccess)
}


testRead()


// server.listen("http://localhost:4000", () => console.log('server is running on port 4000'));
// server.listen(process.env.PORT || 4000, () => console.log('server is running on port 4000'));

