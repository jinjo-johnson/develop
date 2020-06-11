const express = require('express');
const http = require('http');
const socket = require('socket.io');
const bodyParser = require('body-parser')

const app = express();
app.use(express.static('assets'))
app.use(bodyParser.json());
const server = http.Server(app);
const io = socket(server);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
});

// app.post('/login', (req, res) => {
//     if (req.body.username && req.body.password) {
//         res.send({
//             status: true,
//             displayName: req.body.username
//         });
//         console.log('A user logged in.');
//     } else {
//         res.send({
//             status: false,
//             message: "Invalid username or password"
//         });
//     }

// })

server.listen(5000, () => {
    console.log('Listening on port *: 5000');
});

// io.on('connection', (socket) => {

//     socket.emit('connections', Object.keys(io.sockets.connected).length);

//     socket.on('disconnect', () => {
//         console.log("A user disconnected");
//     });

//     socket.on('chat-message', (data) => {
//         socket.broadcast.emit('chat-message', (data));
//     });

//     socket.on('typing', (data) => {
//         socket.broadcast.emit('typing', (data));
//     });

//     socket.on('stopTyping', () => {
//         socket.broadcast.emit('stopTyping');
//     });

//     socket.on('joined', (data) => {
//         socket.broadcast.emit('joined', (data));
//     });

//     socket.on('leave', (data) => {
//         socket.broadcast.emit('leave', (data));
//     });
// });
