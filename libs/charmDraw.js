var charm = require('charm')();
charm.pipe(process.stdout);
charm.cursor(false);

var redraw = 0;

charm.reset();

var layout = [
    'BattleShips ---------------- ---------------- ---------------- ---------------- ----------------',
    [ 'Total Games Played: ',0, '\tTotal Games Won: ',0, '\tTotal Games Lost: ',0 ].join(''),
    'My Board\t\t\t\t\topponent board'
    ];

var drawBoard = function (boardA, boardB) {
    var gridSize = boardA.length-1;


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
    charm.position(1,2);
    charm.write(layout.join('\n')); // header

    // boards
    charm.foreground('red').write('\n-----------------------\t\t\t\t-----------------------'); // draw top

    for(var x = 0; x < gridSize; x++) {
        charm.position(0, x+5); // get new row
        charm.write('\n|'); // draw left wall

        for (var y = 0; y < gridSize; y++) {
            charm.foreground('white').write(/*' . '*/ ' ' + (boardA[x][y] ? boardA[x][y] : '.')); // draw result
        }

        charm.foreground('red').write(' |\t\t\t\t|'); // draw right wall


        for (y = 0; y < gridSize; y++) {
            charm.foreground('white').write(/*' . '*/ ' ' + (boardB[x][y] ? boardB[x][y] : '.')); // draw result
        }

        charm.foreground('red').write(' |'); // draw right wall
    }

    charm.foreground('red').write('\n-------------------------\t\t\t-----------------------'); // draw top

    charm.foreground('white').write('\nRedraw: '+redraw+'\n');
    redraw++;

    charm.write('\n'); // end
};

module.exports = {
    drawBoard: drawBoard,
    reset: function() {
        charm.reset();
    }
};

/*
-----------------------
|. . . . . . . . . . .|
|. . . . . . . . . . .|
|. . . . . . . . . . .|
|. . . . . . . . . . .|
|. . . . . . . . . . .|
|. . . . . . . . . . .|
|. . . . . . . . . . .|
|. . . . . . . . . . .|
|. . . . . . . . . . .|
|. . . . . . . . . . .|
-----------------------
*/