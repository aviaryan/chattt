const blessed = require('blessed');
const colors = require('./../lib/solarized.js');

let list = blessed.list({
	right: 0,
	width: 15,
	top: 0,
	padding: 0,
	tags: true,
	scrollable: true,
	scrollbar: true,
	items: ['', '{bold}USERS{/bold}'],  // workaround
	style: {
		fg: colors.base1,
		bg: colors.base03,
	}
});

let self = {
	list: list,
	screen: null,
	addUsers: (arr) => {
		arr.map((it) => list.add(it));
		self.screen.render();
	}
};

module.exports = self;
