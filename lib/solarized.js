// http://ethanschoonover.com/solarized

const colors = {
	// bg
	'base03': '#002b36',
	'base02': '#073642',
	'base3': '#fdf6e3',
	// content
	'base1': '#93a1a1',
	'base01': '#586e75',
	// accent
	'red': '#dc322f',
	'green': '#859900',
	'magenta': '#d33682',
	'violet': '#6c71c4',
	'blue': '#268bd2',
	'cyan': '#2aa198',
	'yellow': '#b58900',
	'orange': '#cb4b16',
	// functions
	getUserColor: (user) => {
		const options = ['green', 'magenta', 'violet', 'blue', 'cyan', 'yellow', 'orange', 'red'];
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
