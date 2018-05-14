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
    name: 'Hoge',
  });
  io.emit('ADD_OBJECT', {
    id: 2,
    parent: 0,
    name: 'Hoge2',
  });
  io.emit('ADD_OBJECT', {
    id: 3,
    parent: 1,
    name: 'Hoge3',
  });
  io.emit('ADD_OBJECT', {
    id: 4,
    parent: 3,
    name: 'Hoge4',
  });
  io.emit('ADD_PROP', {
    id: 1,
    unique_id: 1,
    parent: 0,
    name: 'param0',
    type: 'float',
  });
  io.emit('ADD_PROP', {
    id: 2,
    unique_id: 1,
    parent: 0,
    name: 'param1',
    type: 'Foo',
  });
  io.emit('ADD_PROP', {
    id: 3,
    unique_id: 1,
    parent: 2,
    name: 'param0',
    type: 'integer',
  });
  io.emit('APPLY_PROP', {
    unique_id: 1,
    inner_id: 3,
    val: 15,
  });
  io.emit('APPLY_PROP', {
    unique_id: 1,
    inner_id: 1,
    val: 0.01,
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
