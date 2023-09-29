const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('chat message', (data) => {
    io.emit('chat message', data); // Envía el mensaje a todos los clientes conectados
  });
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});
