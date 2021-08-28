const admin = require('firebase-admin');
const serviceAccount = require('./key.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});
const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
const socket = require("socket.io");
const io = socket(server);
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const cors = require('cors');
const socketModule = require("./Common/socketMoudle");



// cors exception
app.use(cors());

// using json parse
app.use(jsonParser)

// use socket IO
socketModule({ io });

// default page
app.get('/', (req, res) => {
    res.send('Hello server')
})

// api page
app.use('/api', require('./routes/api'))

// default server port 4000
server.listen(process.env.PORT || 4000, () => console.log('server is running on port 4000'));

