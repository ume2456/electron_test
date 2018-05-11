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
  io.emit('ADD_TYPE', {
    type: 'Hoge',
    id: 0,
    properties: {
      param0: {
        type: 'integer',
        size: 4,
      },
      param1: {
        type: 'float',
        size: 4,
      },
      param2: {
        type: 'Bar',
        properties: {
          param0: {
            type: 'integer',
            size: 4,
          },
          param1: {
            type: 'float',
            size: 4,
          },
          param2: {
            type: 'Foo',
            properties: {
              param0: {
                type: 'integer',
                size: 4,
              },
            },
          },
        },
      },
      param3: {
        type: 'float',
        size: 4,
      },
    },
  });
  io.emit('ADD_TYPE', {
    type: 'Hage',
    id: 1,
    properties: {
      param0: {
        type: 'integer',
        size: 4,
      },
      param2: {
        type: 'Bar',
        properties: {
          param0: {
            type: 'integer',
            size: 4,
          },
          param1: {
            type: 'float',
            size: 4,
          },
        },
      },
    }
  });
  io.emit('ADD_OBJECT', {
    id: 1,
    parent: 0,
    type_id: 0,
  });
  io.emit('ADD_OBJECT', {
    id: 2,
    parent: 0,
    type_id: 1,
  });
  io.emit('ADD_OBJECT', {
    id: 3,
    parent: 1,
    type_id: 1,
  });
  io.emit('ADD_OBJECT', {
    id: 4,
    parent: 3,
    type_id: 1,
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
