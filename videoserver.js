const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const { v4: uuidV4 } = require('uuid');

app.set('view engine', 'ejs');
app.use(express.static('public'));

// Route for the chat page
app.get('/', (req, res) => {
  res.render('chat');
});

// Route for the video call room
app.get('/video-call/:roomId/:callId', (req, res) => {
  res.render('room', { roomId: req.params.roomId, callId: req.params.callId });
});

// Socket.IO event listeners
io.on('connection', socket => {
  socket.on('join-chat', username => {
    // Handle chat functionality here
  });

  socket.on('join-room', (roomId, userId) => {
    socket.join(roomId);
    socket.to(roomId).broadcast.emit('user-connected', userId);

    socket.on('disconnect', () => {
      socket.to(roomId).broadcast.emit('user-disconnected', userId);
    });
  });
});

server.listen(3000, () => {
  console.log('Server listening on port 3000');
});
