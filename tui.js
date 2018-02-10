const colors = require('./lib/solarized.js');
var blessed = require('blessed');


// Create a screen object.
var screen = blessed.screen({
	smartCSR: true,
	useBCE: true
});

screen.title = 'Chattt';

// Create a box perfectly centered horizontally and vertically.
var box = blessed.box({
	top: 0,
	left: 0,
	width: '100%',
	padding: 0,
	scrollable: true,
	scrollbar: true,
	// width: '95%',
	// width: '100%',
	// height: '90%',
	content: '**** Welcome to {bold}chattt{/bold}! ****',
	tags: true,
	border: {
		type: 'line'
	},
	style: {
		fg: colors.base1,
		bg: colors.base03,
		border: {
			fg: '#f0f0f0'
		},
		hover: {
			// bg: 'green'
		},
		"scrollbar": {
			"bg": "grey",
			"fg": "bg"
		}
	}
});

// Append our box to the screen.
screen.append(box);

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

// Add a png icon to the box
var icon = blessed.image({
	parent: box,
	top: 0,
	left: 0,
	type: 'overlay',
	width: 'shrink',
	height: 'shrink',
	file: __dirname + '/my-program-icon.png',
	search: false
});

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
		box.setLine(i+1, ' Joining channel ' + value + " " + i);
	}
	box.setScrollPerc(100);
	box.focus();
	// box.setContent(' Joining channel ' + value);
	screen.render();
});

// Render the screen.
screen.render();
