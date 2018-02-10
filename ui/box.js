const blessed = require('blessed');
const colors = require('./../lib/solarized.js');

let lineCount = 0;

let box = blessed.box({
	top: 0,
	left: 0,
	width: '100%',
	padding: 0,
	scrollable: true,
	scrollbar: true,
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
		scrollbar: {
			bg: "grey",
			fg: "bg"
		}
	}
});

module.exports = {
	box: box,
	addMessage: (text) => {
		lineCount++;
		box.setLine(lineCount, text);
		// lower padding
		for (let i=1; i<=3; i++){
			box.setLine(lineCount+i, '');
		}
		// scroll to the bottom
		box.setScrollPerc(100);
	}
}
