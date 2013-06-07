var testBoardA = [
	[ 0 , 1 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 1 ],
	[ 0 , 0 , 0 , 0 , 0 , 0 , 0 , 1 , 0 , 0 ],
	[ 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ],
	[ 1 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 1 ],
	[ 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ],
	[ 0 , 1 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ],
	[ 0 , 0 , 0 , 0 , 0 , 0 , 0 , 1 , 0 , 1 ],
	[ 1 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ],
	[ 1 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 1 ],
	[ 0 , 1 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 1 ]
];
var testBoardB = [
	[ 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 1 ],
	[ 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ],
	[ 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ],
	[ 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 1 ],
	[ 0 , 0 , 0 , 0 , 1 , 0 , 0 , 1 , 0 , 0 ],
	[ 0 , 1 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 1 ],
	[ 0 , 0 , 0 , 0 , 0 , 0 , 0 , 1 , 0 , 0 ],
	[ 0 , 0 , 0 , 1 , 0 , 0 , 0 , 0 , 0 , 0 ],
	[ 1 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ],
	[ 0 , 1 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ]
];

var gridSize = testBoardA.length;

var charm = require('charm')();
charm.pipe(process.stdout);
charm.reset();
charm.cursor(false);


var layout = [
	'BattleShips ---------------- ---------------- ---------------- ---------------- ----------------',
	[ 'Total Games Played: ',0, '\tTotal Games Won: ',0, '\tTotal Games Lost: ',0 ].join(''),
	'My Board\t\t\t\t\topponent board'
	];
/*,
	'-------------------------\t\t\t-------------------------',
	'| . . . . . . . . . . . |\t\t\t| . . . . . . . . . . . |',
	'| . . . . . . . . . . . |\t\t\t| . . . . . . . . . . . |',
	'| . . . . . . . . . . . |\t\t\t| . . . . . . . . . . . |',
	'| . . . . . . . . . . . |\t\t\t| . . . . . . . . . . . |',
	'| . . . . . . . . . . . |\t\t\t| . . . . . . . . . . . |',
	'| . . . . . . . . . . . |\t\t\t| . . . . . . . . . . . |',
	'| . . . . . . . . . . . |\t\t\t| . . . . . . . . . . . |',
	'| . . . . . . . . . . . |\t\t\t| . . . . . . . . . . . |',
	'| . . . . . . . . . . . |\t\t\t| . . . . . . . . . . . |',
	'| . . . . . . . . . . . |\t\t\t| . . . . . . . . . . . |',
	'-------------------------\t\t\t-------------------------'
];
*/
var redraw = 0;
setInterval(function() {
	charm.position(1,2);
	charm.write(layout.join('\n')); // header

	// boards
	charm.foreground('red').write('\n-----------------------\t\t\t\t-----------------------'); // draw top

	for(var x = 0; x < gridSize; x++) {
		charm.position(0, x+5); // get new row
		charm.write('\n|'); // draw left wall

		for (var y = 0; y < gridSize; y++) {
			charm.foreground('white').write(/*' . '*/ ' ' + (testBoardA[x][y] ? testBoardA[x][y] : '.')); // draw result
		}

		charm.foreground('red').write(' |\t\t\t    |'); // draw right wall


		for (var y = 0; y < gridSize; y++) {
			charm.foreground('white').write(/*' . '*/ ' ' + (testBoardB[x][y] ? testBoardB[x][y] : '.')); // draw result
		}

		charm.foreground('red').write(' |'); // draw right wall
	}

	charm.foreground('red').write('\n-------------------------\t\t\t-----------------------'); // draw top

	charm.foreground('white').write('\nRedraw: '+redraw+'\n');
	redraw++;
}, 1000);
charm.cursor(true);
