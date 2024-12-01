const express = require('express');
const app = express();
const server = require('http').createServer(app);

const io = require('socket.io')(server, {
    cors: {
        origin: process.env.FRONTEND_URL,
        credentials: true,
        methods: ["GET", "POST"]
    }
});

io.on('connection', () => {
    console.log(`New Socket connection & Socket Id: ${socket.id}`);



});

server.listen(3000);