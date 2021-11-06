const express = require ('express');
const app = express();
const server = require('http').Server(app)
const io = require('socket.io')(server, {
    Options: {
        cors: '*'
    }
});

const port = 3000;

io.on('connection', (socket) => {
    // console.log('ALGO SE CONECTO')
    socket.on('join', (data) => {
        const roomName = data.roomName;
        socket.join(roomName);
        socket.to(roomName).broadcast.emit('new-user', data)
        // console.log('Usuario conectado', data)

        socket.on('disconnect', () => {
            socket.to(roomName).broadcast.emit('bye-user', data)
        })
    })
})

server.listen(port, () => {
    console.log(`Server running port ${port}`)
});
