var testBoard = [
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


var charm = require('charm')();
charm.pipe(process.stdout);
charm.reset();
charm.cursor(false);

var offset = 0;
var gridSize = 10;
var redraw = 0;

setInterval(function() {
    charm.foreground('red').write('\n--------------------------------'); // draw top

    for(var x = 0; x < gridSize; x++) {
        charm.position(0, x+2); // get new row
        charm.write('\n|'); // draw left wall

        for (var y = 0; y < gridSize; y++) {
            charm.foreground('white').write(/*' . '*/ ' ' + (testBoard[x][y] ? testBoard[x][y] : '.') + ' '); // draw result
        }

        charm.foreground('red').write('|'); // draw right wall
    }

    charm.foreground('red').write('\n--------------------------------'); // draw bottom
    charm.foreground('green').write('\nredraw: '+ redraw);
    redraw++;
    charm.position(0,0);
charm.write('\n'); // end
},1000);

// charm.position(0, gridSize+2);



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