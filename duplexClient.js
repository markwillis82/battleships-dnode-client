var reconnect = require('reconnect'), // modules
	duplexEmitter = require('duplex-emitter'),
	charmBoard = require('./libs/charmDraw');

var host = 'localhost', // connection settings
	port = 20000;

var myMove = {x: 0, y: 0}, // defaults
	myUser = process.argv.pop(),
	gameId = '',
	regData = {};

var displayBoardA = [],
	displayBoardB = [];

var gridSize = 10, // to build a random grid
	totalMarkers = 10;

var gamesPlayed = 0, // stats
	gamesWon = 0,
	gamesToPlay = 5;

var reconnector = reconnect(function(stream) {
  var peer = duplexEmitter(stream);


	function startGame() { // start a new game
		regData = {
			username: myUser,
			board: getBoard(true)
		};
		myMove = {x: 0, y: 0};
		displayBoardA = regData.board;
		displayBoardB = getBoard(false);
		peer.emit('startGame', regData);
	}

	startGame();

	peer.on('err', function(err, msg) {
		console.log(err, msg);
		process.exit();
	});

	peer.on('gameStart', function(data) {
		console.log('game Start: ', data);
		gameId = data.gameId;
		charmBoard.reset();
	});

	peer.on('endGame', function(win) {
		console.log('game Over: ', win);
		if(win.winner) gamesWon++;
		gamesPlayed++;
		if(gamesPlayed == gamesToPlay) {
			console.log('Finished playing. Total Wins: ', gamesWon);
			process.exit();
		}
		startGame();
	});

	peer.on('gotMove', function(moveData) {
		if(moveData.username == regData.username) {
			// console.log('received My Move: ', moveData);
			displayBoardA[moveData.pos.x][moveData.pos.y] += 's';
		} else {
			displayBoardB[moveData.pos.x][moveData.pos.y] += (moveData.hit ? 'h' : 'm');

			// console.log('received Move: ', moveData);

			myMove.x++;
			if(myMove.x >= gridSize) { // just iterate board
				myMove.x = 0;
				myMove.y++;
			}
			if(myMove.y >= gridSize) process.exit();

			// console.log(displayBoard);
		}
		charmBoard.drawBoard(displayBoardA, displayBoardB);
	});

	peer.on('myMove', function() {
		peer.emit('nextMove', {username: regData.username, gameId: gameId, move: myMove} );
	});

}).connect(port, host);


function getBoard(populate) {
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
		var mx = Math.floor(Math.random()*gridSize),
			my = Math.floor(Math.random()*gridSize);

		if(!board[mx][my]) { // only put new markers where existing blocks are empty
			if(populate) board[mx][my] = 1;
			currentMarker++;
		}
	}

	return board;
}