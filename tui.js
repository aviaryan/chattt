const io = require('socket.io-client');
// const blessed = require('blessed');
// const colors = require('./lib/solarized.js');

let screen = require('./ui/screen');
let box = require('./ui/box.js');
let input = require('./ui/input');

/** Server URL **/
// const URL = 'https://chattt.glitch.me';
const URL = 'http://localhost:3000';

// const socket = io(URL);
// let channel, user;



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

// Render the screen.
box.addPrompt('Enter channel to join');
input.read((val) => {
	box.addPrompt('Enter user handle');
	input.read((val) => {
		// join
		box.add('Joined');
	});
});

// screen.render();
