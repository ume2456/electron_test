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
  socket.on('disconnect', (socket) => {
    console.log('disconnected');
  })
  socket.on('MESSAGE', (data) => {
    console.log('MESSAGE');
    console.log(data);
    io.emit('MESSAGE', {'name': 'Server', 'message': 'hogehoge'});
  });
});
