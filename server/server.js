const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath))

io.on('connection', (socket) => {
    console.log('New user connected');

    // socket.emit from Admin text Welcome to chat app
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app!'));

    // socket.broadcast.emit from Admin text new User joined
    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined!'));

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });

    socket.on('createMessage', (message, callback) => {
        console.log('got message:', message);
        // io.emit is a global cast !!!
        io.emit('newMessage', generateMessage(message.from, message.text));
        callback();
    });

    socket.on('createLocationMessage', (coords, callback) => {
        io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
    });
});

server.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});