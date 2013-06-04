var reconnect = require('reconnect');
var duplexEmitter = require('duplex-emitter');

var port = 20000;
var host = 'localhost';


var board = [
	[0 , 0 , 0, 1],
	[0 , 0 , 0, 0],
	[0 , 0 , 0, 0],
	[0 , 0 , 0, 0]
];

var myMove = {x: 0, y: 0};
var gameId = '';

var reconnector = reconnect(function(stream) {
  var peer = duplexEmitter(stream);

  // peer.on('ping', function(timestamp) {
  //   console.log('got ping from peer %d', timestamp);
  //   peer.emit('pong', timestamp, Date.now());
  // });


	var regData = {
		username: process.argv.pop(),
		board: board
	};


	peer.emit('startGame', regData);

	peer.on('gameStart', function(data) {
		console.log('game Start: ', data);
		gameId = data.gameId;
		if(data.myTurn) {
			peer.emit('nextMove', {username: regData.username, gameId: gameId, move: myMove} );
		}
	});

	peer.on('gotMove', function(moveData) {
		console.log('received Move', moveData);
		peer.emit('nextMove', {username: regData.username, gameId: gameId, move: myMove} );

		myMove.x++;
		if(myMove.x > 4) { // just iterate board
			myMove.x = 0;
			myMove.y++;
		}
		if(myMove.y > 4) process.exit();
	});

}).connect(port, host);