const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath))

io.on('connection', (socket) => {
    console.log('New user connected');

    // socket.emit from Admin text Welcome to chat app
    socket.emit('newMessage', {
        from: 'Server Bot',
        text: 'Welcome to the chat app :-)',
        createdAt: new Date().getTime()
    });

    // socket.broadcast.emit from Admin text new User joined
    socket.broadcast.emit('newMessage', {
        from: 'Server Bot',
        text: 'New user joined!',
        createdAt: new Date().getTime()
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });

    socket.on('createMessage', (message) => {
        console.log('got message:', message);
        // io.emit is a global cast !!!
        io.emit('newMessage', {
            from: message.from,
            text: message.text,
            createdAt: new Date().getTime()
        });
        // socket.broadcast.emit('newMessage', {
        //     from: message.from,
        //     text: message.text,
        //     createdAt: new Date().getTime()
        // });
    });
});

server.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});