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
	content: `{center}{${colors.blue}-fg}****Welcome to {bold}chattt{/bold}!****{/${colors.blue}-fg}{/center}`,
	tags: true,
	style: {
		fg: colors.base1,
		bg: colors.base03
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
	addInline: (text) => {
		box.setLine(lineCount, box.getLine(lineCount) + text);
		self.finishAdding();
	},
	addPrompt: (text) => {
		self.add('>> ' + text);
	},
	addAnn: (text) => {
		self.add('{center}*** ' + text + ' ***{/center}');
	},
	addChatAnn: (text) => {
		self.add(`{center}{${colors.yellow}-fg}${text}{/${colors.yellow}-fg}{/center}`);
	},
	addErr: (text) => {
		self.add(`{${colors.red}-fg}${text}{/${colors.red}-fg}`);
	},
	addChatMsg: (msg) => {
		let clr = colors.getUserColor(msg.user);
		self.add(`{${clr}-fg}${msg.user}:{/${clr}-fg} ${msg.data}`);
	},
	deleteAllLines: () => {
		for (let i = lineCount; i >= 1; i--){
			box.deleteLine(i);
		}
		lineCount = 0;
	},
	setJoinMessage: (ch, url) => {
		box.content = `{center}#${ch} at {${colors.blue}-fg}${url}{/${colors.blue}-fg} (ctrl-c to exit){/center}`;
		self.screen.render();
	}
};

module.exports = self;
