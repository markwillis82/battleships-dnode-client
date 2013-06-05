var reconnect = require('reconnect');
var duplexEmitter = require('duplex-emitter');

var port = 20000;
var host = 'localhost';

	var regData = {
		username: process.argv.pop(),
		board: []
	};

var board = [
	[0 , 0 , 0, 1],
	[0 , 0 , 0, 0],
	[0 , 0 , 0, 0],
	[0 , 0 , 0, 0]
];

if(regData.username == 'user1') {
	board = [
		[0 , 0 , 0, 0],
		[0 , 0 , 0, 0],
		[0 , 0 , 0, 0],
		[0 , 0 , 0, 1]
	];
}
regData.board = board;
var myMove = {x: 0, y: 0};
var gameId = '';

var reconnector = reconnect(function(stream) {
  var peer = duplexEmitter(stream);

  // peer.on('ping', function(timestamp) {
  //   console.log('got ping from peer %d', timestamp);
  //   peer.emit('pong', timestamp, Date.now());
  // });




	peer.emit('startGame', regData);

	peer.on('gameStart', function(data) {
		console.log('game Start: ', data);
		gameId = data.gameId;
	});

	peer.on('gameOver', function(win) {
		console.log('game Over: ', win);
		process.exit();
	});

	peer.on('gotMove', function(moveData) {
		if(moveData.username == regData.username) {
			console.log('received My Move: ', moveData);
		} else {
			console.log('received Move: ', moveData);
			myMove.x++;
			if(myMove.x >= 4) { // just iterate board
				myMove.x = 0;
				myMove.y++;
			}
			if(myMove.y >= 4) process.exit();
		}
	});

	peer.on('myMove', function() {
		peer.emit('nextMove', {username: regData.username, gameId: gameId, move: myMove} );
	})

}).connect(port, host);