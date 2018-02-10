const blessed = require('blessed');
const colors = require('./lib/solarized.js');

// Create a screen object.
var screen = blessed.screen({
	smartCSR: true,
	useBCE: true
});

screen.title = 'Chattt';

let box = require('./ui/box.js');

// Append our box to the screen.
screen.append(box.box);

var textBox = blessed.textbox({
	bottom: 0,
	height: 3,
	style: {
		bg: '#000000'
	},
	padding: {
		top: 1,
		left: 2
	}
});

screen.append(textBox);

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

// Quit on Escape, q, or Control-C.
screen.key(['escape', 'q', 'C-c'], function (ch, key) {
	return process.exit(0);
});

// Focus our element.
// box.focus();
textBox.focus();
textBox.readInput((err, value) => {
	// console.log(value);
	for (let i=0; i<100; i++){
		box.batchAdd(' Joining channel ' + value + " " + i);
		// box.setLine(i+1, ' Joining channel ' + value + " " + i);
	}
	box.finishAdding();
	// box.setScrollPerc(100);
	// box.focus();
	// box.setContent(' Joining channel ' + value);
	box.focus();
	screen.render();
});

// Render the screen.
screen.render();
