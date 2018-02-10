const io = require('socket.io-client');
const blessed = require('blessed');

let program = blessed.program();
let screen = require('./ui/screen');
let box = require('./ui/box.js');
let input = require('./ui/input');

/** Server URL **/
// const URL = 'https://chattt.glitch.me';
const URL = 'http://localhost:3000';

// server connection
const socket = io(URL);
let channel, user;

// Append elements to the screen.
screen.append(box.box);
screen.append(input.input);
box.screen = screen;
input.screen = screen;

// when socket connects
socket.on('connect', () => {
	box.addAnn('Connected to the server ' + URL);

	// join a channel
	let userJoin = () => {
		box.addPrompt('Enter user handle');
		input.read((val) => {
			user = val;
			// join
			socket.emit('/join', { channel: channel, user: user });
		});
	};
	box.addPrompt('Enter channel to join');
	input.read((ch) => {
		channel = ch;
		userJoin();
	});

	// set other listener
	socket.on('/status', (msg) => {
		if (msg.type === 'join failed') {
			box.addErr(msg.data);
			userJoin();
		} else if (msg.type === 'joined') {
			// delete old lines
			box.deleteAllLines();
			// set status message
			box.addAnn(`Joined channel ${channel} as ${user}`);
			// listener for messages
			socket.on('/msg ' + channel, function (msg) {
				if (msg.user === null) {
					// public message TODO:
					box.addChatAnn(msg.data);
				} else {
					box.addChatMsg(msg);
				}
			});
			// get user input messages
			let getInput = () => {
				input.read((val) => {
					socket.emit('/msg ' + channel, { user: user, data: val });
					getInput();
				});
			};
			getInput();
		}
	});
});

// initial render
screen.render();

// force exit feature
program.key('C-c', function (ch, key) {
	program.clear();
	process.exit(0);
});

// clear value when escape pressed
// meant as a way to cancel message operation
program.key('escape', (ch, key) => {
	input.clear();
});
