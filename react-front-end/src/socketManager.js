import socketIOClient from 'socket.io-client';

// const endpoint = 'wss://tune-in-drop-out-tido.herokuapp.com';
// const endpoint = 'http://127.0.0.1:4001';

//Very simply connect to the socket
// const host = window.location.origin.replace(/^http/, 'ws');
// // const socket = socketIOClient('/', {
// //   transports: ['websocket']
// // });
// console.log('host', host);
// const endpoint = 'http://127.0.0.1:4001';
const endpoint = `${window.location.protocol.replace('http', 'ws')}//${
  window.location.hostname
}:4001`;
console.log('endpoint', endpoint);

//Very simply connect to the socket
const socket = socketIOClient(endpoint);

export const joinParty = partyName => {
  socket.emit('joinParty', partyName);
};

export const songAdd = (song, room) => {
  socket.emit('songAdd', { song, room });
};

export const subscribeToSongAdd = callback => {
  socket.on('addSong', song => {
    callback(song);
  });
};

// export const currentTrackPlaying = (song, room) => {
//   socket.emit('currentTrackPlaying', { song, room });
// };

// export const subscribeToCurrentTrackPlaying = callback => {
//   socket.on('currentTrackPlaying', song => {
//     callback(song);
//   });
// };
