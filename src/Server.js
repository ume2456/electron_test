const express = require('express');
const socket = require('socket.io');

var app = express();

server = app.listen(5000, () => {
  console.log('server is running on port 5000');
});

io = socket(server);

io.on('connection', (socket) => {
  console.log('connection');
  io.emit('MESSAGE', {'name': 'Server', 'message': 'Hello'});
  io.emit('ADD_OBJECT', {
    id: 1,
    parent: 0,
  });
  io.emit('ADD_OBJECT', {
    id: 2,
    parent: 0,
  });
  io.emit('ADD_OBJECT', {
    id: 3,
    parent: 1,
  });
  io.emit('ADD_OBJECT', {
    id: 4,
    parent: 3,
  });
  io.emit('ADD_OBJECT', {
    id: 4,
    parent: 3,
  });
  io.emit('ADD_OBJECT', {
    id: 4,
    parent: 3,
  });
  io.emit('ADD_OBJECT', {
    id: 4,
    parent: 3,
  });
  io.emit('ADD_OBJECT', {
    id: 4,
    parent: 3,
  });
  io.emit('ADD_OBJECT', {
    id: 4,
    parent: 3,
  });
  io.emit('ADD_OBJECT', {
    id: 4,
    parent: 3,
  });
  io.emit('ADD_OBJECT', {
    id: 4,
    parent: 3,
  });
  io.emit('ADD_OBJECT', {
    id: 4,
    parent: 3,
  });
  io.emit('ADD_OBJECT', {
    id: 4,
    parent: 3,
  });
  io.emit('ADD_OBJECT', {
    id: 4,
    parent: 3,
  });
  io.emit('ADD_OBJECT', {
    id: 4,
    parent: 3,
  });
  io.emit('ADD_OBJECT', {
    id: 4,
    parent: 3,
  });
  io.emit('ADD_OBJECT', {
    id: 4,
    parent: 3,
  });
  io.emit('ADD_OBJECT', {
    id: 4,
    parent: 3,
  });
  io.emit('ADD_OBJECT', {
    id: 4,
    parent: 3,
  });
  io.emit('ADD_OBJECT', {
    id: 4,
    parent: 3,
  });
  io.emit('ADD_OBJECT', {
    id: 4,
    parent: 3,
  });
  io.emit('ADD_OBJECT', {
    id: 4,
    parent: 3,
  });
  io.emit('ADD_OBJECT', {
    id: 4,
    parent: 3,
  });
  io.emit('ADD_OBJECT', {
    id: 4,
    parent: 3,
  });
  io.emit('ADD_OBJECT', {
    id: 4,
    parent: 3,
  });
  io.emit('ADD_OBJECT', {
    id: 4,
    parent: 3,
  });
  io.emit('ADD_OBJECT', {
    id: 4,
    parent: 3,
  });
  io.emit('ADD_OBJECT', {
    id: 4,
    parent: 3,
  });
  io.emit('ADD_OBJECT', {
    id: 4,
    parent: 3,
  });
  io.emit('ADD_OBJECT', {
    id: 4,
    parent: 3,
  });

  socket.on('disconnect', (socket) => {
    console.log('disconnected');
  })
  socket.on('MESSAGE', (data) => {
    console.log('MESSAGE');
    console.log(data);
    io.emit('MESSAGE', {'name': 'Server', 'message': 'hogehoge'});
  });
});
