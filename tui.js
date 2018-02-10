const io = require('socket.io-client');
const blessed = require('blessed');

let program = blessed.program();
let screen = require('./ui/screen');
let box = require('./ui/box.js');
let input = require('./ui/input');

/** Server URL **/
// const URL = 'https://chattt.glitch.me';
const URL = 'http://localhost:3000';

const socket = io(URL);
let channel, user;


// Append our box to the screen.
screen.append(box.box);
screen.append(input.input);
box.screen = screen;

// If our box is clicked, change the content.
// box.on('click', function (data) {
// 	box.setContent('{center}Some different {red-fg}content{/red-fg}.{/center}');
// 	screen.render();
// });

// If box is focused, handle `enter`/`return` and give us some more content.
// box.key('enter', function (ch, key) {
// 	box.setContent('{right}Even different {black-fg}content{/black-fg}.{/right}\n');
// 	box.setLine(1, 'bar');
// 	box.insertLine(1, 'foo');
// 	screen.render();
// });

// Focus our element.
// box.focus();
// input.read((val) => {
// 	for (let i = 0; i < 100; i++) {
// 		box.batchAdd('Joining channel ' + val + " " + i);
// 		// box.setLine(i+1, ' Joining channel ' + value + " " + i);
// 	}
// 	box.finishAdding();
// 	// box.setScrollPerc(100);
// 	// box.focus();
// 	// box.setContent(' Joining channel ' + value);
// 	// box.focus();
// 	// screen.render();
// });

// when socket connects
socket.on('connect', () => {
	box.addAnn('Connected to the server');

	// Render the screen.
	box.addPrompt('Enter channel to join');
	input.read((ch) => {
		channel = ch;
		box.addPrompt('Enter user handle');
		input.read((val) => {
			user = val;
			// join
			socket.emit('/join', { channel: channel, user: user });
		});
	});

	// set other listener
	socket.on('/status', (msg) => {
		if (msg.type === 'join failed') {
			// console.log(`[ ${msg.data} ]`);
			// TODO: retry
			// getUserAndJoin();
			box.add('failed');
			// TODO: err messages

		} else if (msg.type === 'joined') {
			// set status message
			box.addAnn(`Joined channel ${channel} as ${user}`);
			// listener for messages
			socket.on('/msg ' + channel, function (msg) {
				if (msg.user === null) {
					box.add(`[ ${msg.data} ]`);
				} else {
					box.add(`${msg.user}: ${msg.data}`);
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
