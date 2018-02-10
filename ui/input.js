const blessed = require('blessed');

let input = blessed.textbox({
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

module.exports = {
	input: input,
	focus: () => {
		input.focus();
	},
	read: (cb) => {
		input.focus();
		input.readInput((err, value) => {
			if (err) {
				console.log(err);
			}
			cb(value);
		});
	}
};
