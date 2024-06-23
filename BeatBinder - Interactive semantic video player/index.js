// @create-index

const express = require('express');
const http = require('http');
const socketio = require('socket.io');

const port = 80;

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(express.static('public'));

let users = [];

io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('join', (data) => {
    const username = data.username.trim();
    if (users.includes(username)) {
      socket.emit('username taken', username);
    } else {
      users.push(username);
      socket.username = username; // Guarda el nombre de usuario en el socket
      io.emit('user joined', { username }); // Notifica a todos que un usuario se unió
      io.emit('user list', users); // Envía la lista actualizada de usuarios a todos los clientes
    }
  });

  // Maneja los mensajes del chat
  socket.on('chat message', (data) => {
    console.log(`Message from ${data.username}: ${data.message}`);
    io.emit('chat message', data);
  });

  // Maneja la desconexión del usuario
  socket.on('disconnect', () => {
    console.log("Has connected");
    if (socket.username) {
      users = users.filter(user => user !== socket.username);
      console.log(`User left: ${socket.username}`);
      io.emit('user left', socket.username); // Notifica a todos que un usuario se fue
      io.emit('user list', users); // Envía la lista actualizada de usuarios a todos los clientes
    }
  });
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

server.listen(port, () => {
  console.log(`Example app listening on port 
  ${port}`);
});
