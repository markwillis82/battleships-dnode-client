var dnode = require('dnode');

var d = dnode.connect(5004); // connect

// my game board - for a start just use a 4x4 grid

var board = [
	[0 , 0 , 0, 1],
	[0 , 0 , 0, 0],
	[0 , 0 , 0, 0],
	[0 , 0 , 0, 0]
];


d.on('remote', function (remote) {
	var regData = {
		username: process.argv.pop(),
		board: board
	};

	console.log('user: ', regData.username);

    remote.startGame(regData, function (s) {
        console.log('Waiting for game start => ', s);
        d.end();
    });
});
