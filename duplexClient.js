var reconnect = require('reconnect'), // modules
	duplexEmitter = require('duplex-emitter');

var host = 'localhost', // connection settings
	port = 20000;

var myMove = {x: 0, y: 0}, // defaults
	myUser = process.argv.pop(),
	gameId = '',
	regData = {};


var gridSize = 4, // to build a random grid
	totalMarkers = 4;

var gamesPlayed = 0, // stats
	gamesWon = 0;

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
		if(win.winner) gamesWon++;
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
	var board = [],
		currentMarker = 0;

	// build empty board
	for(var x = 0; x < gridSize; x++) {
		board[x] = [];
		for(var y = 0; y < gridSize; y++) {
			board[x][y] = 0;
		}
	}

	// add points at random places

	while(currentMarker < totalMarkers) {
		var x = Math.floor(Math.random()*gridSize),
			y = Math.floor(Math.random()*gridSize);

		if(!board[x][y]) { // only put new markers where existing blocks are empty
			board[x][y] = 1;
			currentMarker++;
		}
	}

	return board;
}