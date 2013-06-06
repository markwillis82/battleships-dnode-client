var charm = require('charm')();
charm.pipe(process.stdout);
charm.cursor(false);

var redraw = 0;

charm.reset();

var drawBoard = function (board) {
    var gridSize = board.length-1;

    charm.position(0,0);
    charm.foreground('red').write('\n--------------------------------'); // draw top

    for(var x = 0; x < gridSize; x++) {
        charm.position(0, x+2); // get new row
        charm.write('\n|'); // draw left wall

        for (var y = 0; y < gridSize; y++) {
            charm.foreground('white').write(/*' . '*/ ' ' + (board[x][y] ? board[x][y] : '.') + ' '); // draw result
        }

        charm.foreground('red').write('|'); // draw right wall
    }

    charm.foreground('red').write('\n--------------------------------'); // draw bottom
    charm.foreground('green').write('\nredraw: '+ redraw);
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