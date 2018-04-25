import ioClient from 'socket.io-client';

export default class Client {
  constructor(address, port) {
    this.socket = ioClient(`http://${address}:${port}`);
    this.socket.on('connect', () => {
      console.log('connect');
    })
    this.socket.on('disconnect', (data) => {
      console.log('disconnect');
    });
    this.socket.on('reconnect', () => {
      console.log('reconnect');
    });
    this.socket.on('connect_error', (error) => {
      console.log('CONNECTION ERROR: ', error);
    });
    this.socket.on('error', (error) => {
      console.log('ERROR: ', error);
    });
  }

  sendMessage(data = []) {
    this.socket.emit('MESSAGE', data);
  }

  setEvent(name = '', callback = () => {}) {
    this.socket.on(name, callback);
  }
}
