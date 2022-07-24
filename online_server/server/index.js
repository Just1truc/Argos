const express = require('express');
const app = express();
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const authRoutes = require('./src/routes/auth/auth');
const clientsRoutes = require('./src/routes/clients/clients');
const checkToken = require('./src/tokenCheck/auth');
const servicesRoutes = require('./src/routes/services/services');
const {
    checkClientId
} = require('./src/tools/tools');

dotenv.config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization, X-Auth-Token');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    if (req.method === 'OPTIONS')
        res.status(200).send();
    else
        next();
});

app.use('/', authRoutes);

app.use('/clients',
checkToken,
clientsRoutes);

app.use('/services/:client_id',
checkToken,
checkClientId,
servicesRoutes);

app.use((req, res, next) => {
    res.status(404).send({
        "msg" : "Not found"
    });
})

const server = app.listen(process.env.PORT || 3000, () => {
    console.log("Server Running on port : " + process.env.PORT);
});

const io = require('socket.io')(server);

global.clients = {};

var client_id = 1;

io.on('connection', (socket) => {
    socket.client_id = client_id++;
    clients[socket.client_id] = socket;
    //socket.emit("message",
    //{
    //    type : "msg",
    //    msg : "You are connected boi !"
    //});
    socket.on("disconnect",
    () => {
        console.log("Connection Lost");
        delete clients[socket.client_id];
    });
    socket.on("name", (data) => {
        socket.client_name = data.name.replace("\n", "");
        console.log("User : " + data.name.replace("\n", "") + " connected");
    })
});
