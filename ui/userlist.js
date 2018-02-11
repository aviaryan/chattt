const blessed = require('blessed');
const colors = require('./../lib/solarized.js');

let list = blessed.list({
	right: 0,
	width: 15,
	top: 0,
	padding: {
		top: 0, bottom: 0, left: 1, right: 0
	},
	tags: true,
	scrollable: true,
	scrollbar: true,
	items: ['', `{bold}{${colors.orange}-fg}USERS{${colors.orange}-fg}{/bold}`],  // workaround
	style: {
		fg: colors.base01,
		bg: colors.base3,
	}
});

let self = {
	list: list,
	screen: null,
	addUsers: (arr) => {
		arr.map((it) => list.add(it));
		self.screen.render();
	},
	addUser: (user) => {
		list.add(user);
		self.screen.render();
	},
	removeUser: (user) => {
		// https://github.com/chjj/blessed/blob/master/lib/widgets/list.js#L234
		let i = 0;
		for (; i < list.items.length; i++){
			if (list.items[i].content === user){
				break;
			}
		}
		if (i < list.items.length){
			list.removeItem(list.items[i]);
		}
		self.screen.render();
	}
};

module.exports = self;
