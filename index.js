const io = require('socket.io-client');

const URL = 'https://chattt.glitch.me';
// const URL = 'http://localhost:3000'; 

const socket = io(URL);

socket.on('connect', () => {
	console.log('connected');
});
