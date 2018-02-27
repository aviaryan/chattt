const blessed = require('blessed');
const colors = require('./../lib/solarized.js');

let input = blessed.textbox({
	bottom: 0,
	height: 3,
	style: {
		bg: colors.base02,
		fg: colors.base1
	},
	padding: {
		top: 1,
		left: 2
	}
});

let self = {
	input: input,
	screen: null,
	focus: () => {
		input.focus();
	},
	read: (cb) => {
		input.focus();
		input.readInput((err, value) => {
			if (err) {
				console.log(err);
			}
			if (!value){
				// read again, nothing was entered
				self.read(cb);
			} else {
				self.clear();
				cb(value);
			}
		});
	},
	clear: () => {
		input.clearValue();
		self.screen.render();
	},
	set: (val) => {
		input.setValue(val);
		self.screen.render();
	}
};

module.exports = self;
