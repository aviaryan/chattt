const blessed = require('blessed');

// Create a screen object.
let screen = blessed.screen({
	smartCSR: true,
	useBCE: true,
	title: 'Chattt'
});

// Quit on Ctrl-C, Esc or Q
// screen.key(['escape', 'q', 'C-c'], function (ch, key) {
// 	return process.exit(0);
// });

module.exports = screen;
