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
	content: '{center}****Welcome to {bold}chattt{/bold}!****{/center}',
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

let self = {
	box: box,
	screen: null,
	batchAdd: (text) => {
		box.setLine(++lineCount, text);
	},
	finishAdding: () => {
		// lower padding
		for (let i = 1; i <= 3; i++) {
			box.setLine(lineCount + i, '');
		}
		// scroll to the bottom
		box.setScrollPerc(100);
		// render update
		self.screen.render();
	},
	focus: () => {
		box.focus();
	},
	add: (text) => {
		self.batchAdd(text);
		self.finishAdding();
	},
	addPrompt: (text) => {
		self.add('>> ' + text);
	},
	addAnn: (text) => {
		self.add('{center}*** ' + text + ' ***{/center}');
	},
	addErr: (text) => {
		self.add(`{${colors.red}-fg}${text}{/${colors.red}-fg}`);
	},
	addChatMsg: (msg) => {
		let clr = colors.getUserColor(msg.user);
		self.add(`{${clr}-fg}${msg.user}:{/${clr}-fg} ${msg.data}`);
	}
};

module.exports = self;
