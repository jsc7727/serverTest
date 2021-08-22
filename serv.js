const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
const socket = require("socket.io");
const io = socket(server);
const socketModule = require("./Common/socketMoudle");
const admin = require('firebase-admin');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const serviceAccount = require('./startplayup-b27e5-5a7e25ff021b.json');
const users = require("./Common/fireBaseDB/Create/test/users");
const rooms = require("./Common/fireBaseDB/Create/test/rooms");
const { deleteUser, deleteRoom } = require("./Common/fireBaseDB/Delete/Delete")

const { getUserFromEmail, getListOfRooms } = require("./Common/fireBaseDB/Read/Read");
const { parse } = require("path");
const { createRoom, createUser } = require("./Common/fireBaseDB/Create/Create");


// parse application/json
app.use(jsonParser)

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

// deleteUser({ db, email: "test1@google.com" });

// console.log(getListOfRooms)


app.get('/getRooms', async (req, res, next) => {
    try {
        const [roomList, success] = await getListOfRooms({ db });
        const users = JSON.stringify({ roomList, success });
        res.send(users)
    } catch (error) {
        next(error)
    }
})

app.get('/checkUser:email', async (req, res, next) => {
    try {
        const email = req.params.email;
        const [userData, success] = await getUserFromEmail({ db, email });
        const users = JSON.stringify({ userData, success });
        res.send(users)
    } catch (error) {
        next(error)
    }
})

app.post('/createRoom', async (req, res, next) => {
    try {
        const roomConfig = req.body;
        // console.log("roomConfig : ", req, roomConfig)
        // const dbCollectionRooms = db.collection("rooms")
        // const addResult = await dbCollectionRooms.add({ ...roomConfig, timestamp: FieldValue.serverTimestamp() })
        const addResult = createRoom({ db, roomConfig });
        const users = JSON.stringify({ id: addResult.id });
        res.send(users)
    } catch (error) {
        next(error)
    }
})

app.post('/accessRoom', async (req, res, next) => {
    try {
        const roomConfig = req.body;
        const dbCollectionRooms = db.collection("rooms")
        const res = await dbCollectionRooms.add({ ...roomConfig, timestamp: FieldValue.serverTimestamp() })
        const users = JSON.stringify({ id: res.doc.id });
        res.send(users)
    } catch (error) {
        next(error)
    }
})

app.post('/createUser', async (req, res, next) => {
    try {
        const userConfig = req.body;
        const dbCollectionRooms = db.collection("rooms")
        const res = await createUser({ db, userConfig })
        const users = JSON.stringify({});
        res.send(users)
    } catch (error) {
        next(error)
    }
})




// server.listen("http://localhost:4000", () => console.log('server is running on port 4000'));
server.listen(process.env.PORT || 4000, () => console.log('server is running on port 4000'));

