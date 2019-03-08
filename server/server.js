const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath))

io.on('connection', (socket) => {

    socket.on('join', (params, callback) => {
        if (!isRealString(params.name) || !isRealString(params.room)){
            callback('Name and group are required.');
        }
        console.log(`${params.name} joined.`);

        socket.join(params.room);
        // socket.emit from ChatBot text Welcome to chat app
        socket.emit('newMessage', generateMessage('ChatBot', 'Welcome to the chat app!'));
        // socket.broadcast.emit from ChatBot text new User joined
        socket.broadcast.to(params.room).emit('newMessage', generateMessage('ChatBot', `${params.name} has joined.`));
        

        callback();
    });

    socket.on('createMessage', (message, callback) => {
        console.log('got message:', message);
        io.emit('newMessage', generateMessage(message.from, message.text));
        callback();
    });
    
    socket.on('createLocationMessage', (coords, callback) => {
        io.emit('newLocationMessage', generateLocationMessage('User', coords.latitude, coords.longitude));
        callback();
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

server.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});