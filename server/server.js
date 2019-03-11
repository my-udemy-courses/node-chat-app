const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();

var admin = "The Great Mayfly";

app.use(express.static(publicPath))

io.on('connection', (socket) => {

    socket.on('join', (params, callback) => {
        if (!isRealString(params.name) || !isRealString(params.room)){
            return callback('Name and group are required.');
        }

        socket.join(params.room);
        users.removeUser(socket.id);
        users.addUser(socket.id, params.name, params.room);

        io.to(params.room).emit('updateUserList', users.getUserList(params.room));
        // socket.emit from ChatBot text Welcome to chat app
        socket.emit('newMessage', generateMessage(`${admin}`, `Welcome to ${params.room}! :-)`));
        // socket.broadcast.emit from ChatBot text new User joined
        socket.broadcast.to(params.room).emit('newMessage', generateMessage(`${admin}`, `${params.name} joined!`));

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
        var user = users.removeUser(socket.id);
        console.log(`${user.name} flew away..`);

        if (user){
            io.to(user.room).emit('updateUserList', users.getUserList(user.room));
            io.to(user.room).emit('newMessage', generateMessage(`${admin}`, `${user.name} flew away..`));
        }
    });
});

server.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});