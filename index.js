let io = require('socket.io-client');

let socket = io('https://chattt.glitch.me');

socket.on('connect', () => {
	console.log('connected');
});
