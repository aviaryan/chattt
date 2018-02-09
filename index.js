const io = require('socket.io-client');
const readline = require('readline');

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

// const URL = 'https://chattt.glitch.me';
const URL = 'http://localhost:3000';

const socket = io(URL);

let channel, user;

function getChannel(cb){
	rl.question(`Enter channel > `, (inp) => {
		channel = inp;
		if (cb){
			cb();
		}
	});
}

function getUser(cb) {
	rl.question(`Enter user > `, (inp) => {
		user = inp;
		if (cb) {
			cb();
		}
	});
}

socket.on('connect', () => {
	console.log('connected');
	let getUserAndJoin = () => {
		getUser(() => {
			socket.emit('/join', { channel: channel, user: user });
		});
	};
	getChannel(getUserAndJoin);

	socket.on('/status', (msg) => {
		if (msg.type === 'join failed'){
			console.log(`[ ${msg.data} ]`);
			getUserAndJoin();
		} else if (msg.type === 'joined') {
			// listener for messages
			socket.on('/msg ' + channel, function (msg) {
				if (msg.user === null) {
					console.log(`[ ${msg.data} ]`);
				} else {
					console.log(`${msg.user}: ${msg.data}`);
				}
			});
			// get user input messages
			let getInput = () => {
				rl.question('', (inp) => {
					socket.emit('/msg ' + channel, { user: user, data: inp });
					// https://stackoverflow.com/questions/45147470/
					readline.moveCursor(process.stdout, 0, -1);
					getInput();
				});
			};
			getInput();
		}
	});
});
