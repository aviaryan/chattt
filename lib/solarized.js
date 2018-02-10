// http://ethanschoonover.com/solarized

const colors = {
	'base03': '#002b36',
	'base1': '#93a1a1',
	'red': '#dc322f',
	// general purpose
	'green': '#859900',
	'magenta': '#d33682',
	'violet': '#6c71c4',
	'blue': '#268bd2',
	'cyan': '#2aa198',
	'yellow': '#b58900',
	'orange': '#cb4b16',
	// functions
	getUserColor: (user) => {
		const options = ['green', 'magneta', 'violet', 'blue', 'cyan', 'yellow', 'orange', 'red'];
		let color = options[colors.getStringSum(user) % options.length];
		return colors[color];
	},
	getStringSum: (text) => {
		let sum = 0;
		text.split('').forEach((char) => {
			sum += char.charCodeAt(0);
		});
		return sum;
	}
};

module.exports = colors;
