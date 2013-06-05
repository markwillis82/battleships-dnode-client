var reconnect = require('reconnect');
var duplexEmitter = require('duplex-emitter');

var port = 20000;
var host = 'localhost';

var myMove = {x: 0, y: 0};
var myUser = process.argv.pop();
var gameId = '';
var regData = {};

var gamesPlayed = 0;
var gamesWon = 0;

var reconnector = reconnect(function(stream) {
  var peer = duplexEmitter(stream);


	function startGame() { // start a new game
		regData = {
			username: myUser,
			board: getBoard()
		};
		myMove = {x: 0, y: 0};
		peer.emit('startGame', regData);
	}
	startGame();

	peer.on('gameStart', function(data) {
		console.log('game Start: ', data);
		gameId = data.gameId;
	});

	peer.on('endGame', function(win) {
		console.log('game Over: ', win);
		if(win.winner == myUser) gamesWon++;
		gamesPlayed++;
		if(gamesPlayed == 10) {
			console.log('Finished playing. Total Wins: ', gamesWon);
			process.exit();
		}
		startGame();
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
	});

}).connect(port, host);


function getBoard() {
	var boards = [
		[
			[1 , 0 , 0, 0],
			[0 , 1 , 0, 0],
			[0 , 0 , 1, 0],
			[0 , 1 , 0, 0]
		],
		[
			[0 , 0 , 0, 1],
			[0 , 0 , 0, 0],
			[0 , 1 , 0, 1],
			[0 , 1 , 0, 0]
		],
		[
			[0 , 0 , 0, 1],
			[0 , 1 , 0, 0],
			[0 , 0 , 1, 0],
			[0 , 1 , 0, 0]
		],
		[
			[0 , 0 , 0, 1],
			[0 , 0 , 0, 1],
			[0 , 0 , 0, 1],
			[0 , 0 , 0, 1]
		],
		[
			[1 , 1 , 1, 1],
			[0 , 0 , 0, 0],
			[0 , 0 , 0, 0],
			[0 , 0 , 0, 0]
		],
		[
			[0 , 0 , 0, 1],
			[0 , 1 , 1, 0],
			[0 , 0 , 0, 0],
			[0 , 1 , 0, 0]
		],
		[
			[0 , 0 , 0, 0],
			[0 , 1 , 1, 0],
			[0 , 1 , 0, 0],
			[0 , 1 , 0, 0]
		],
		[
			[0 , 0 , 0, 1],
			[1 , 1 , 1, 0],
			[0 , 0 , 0, 0],
			[0 , 0 , 0, 0]
		]
	];
	return boards[Math.floor(Math.random()*boards.length)];
}