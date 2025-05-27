const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const path = require('path');
const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const PORT = 8000;

// ✅ Serve all files in public folder
app.use(express.static(path.join(__dirname, 'public')));

// ✅ Serve chat.html only when requested
app.get('/chat.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'chat.html'));
});

// ✅ Socket.IO communication
io.on('connection', (socket) => {
    console.log('New client connected');
    socket.on('message', (data) => {
        console.log(`${data.username}: ${data.msg}`);
        io.emit('message', data);
    });
    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

server.listen(PORT, () => {
    console.log(`✅ Server running at http://localhost:${PORT}`);
});
