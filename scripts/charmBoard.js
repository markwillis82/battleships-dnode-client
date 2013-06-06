var charm = require('charm')();
charm.pipe(process.stdout);
charm.reset();

charm.cursor(false);

var offset = 0;
var gridSize = 10;
var redraw = 0;

setInterval(function() {
    charm.foreground('red').write('\n--------------------------------');
    // charm.move(0, 0);

    for(var x = 0; x <= gridSize; x++) {
        charm.position(0, x+2);
        charm.write('\n|');
            // .foreground('white')
            // .write('. . . . . . . . . . .')
            // .foreground('red')
            // .write('|');
        for (var y = 0; y < gridSize; y++) {
            charm.foreground('white').write(' . ');
        }
        charm.foreground('red').write('|');
    }
    // charm.position(0,gridSize+1);
    charm.foreground('red').write('\n--------------------------------');
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