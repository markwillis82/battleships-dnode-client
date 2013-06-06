var charm = require('charm')();
charm.pipe(process.stdout);
charm.reset();

var colors = [ 'red', 'cyan', 'yellow', 'green', 'blue' ];
var text = 'Always after me lucky charms.';

var offset = 0;
var gridSize = 10;

var y = 2;
charm.foreground('red').write('\n--------------------------------');
// charm.move(0, 0);

for(var x = 0; x <= gridSize; x++) {
    charm.position(0, x+2);
    charm.write('\n|');
        // .foreground('white')
        // .write('. . . . . . . . . . .')
        // .foreground('red')
        // .write('|');
    for (var y = 0; y < 10; y++) {
        charm.foreground('white').write(' . ');
    }
    charm.foreground('red').write('|');
}
// charm.position(0,gridSize+1);
charm.foreground('red').write('\n--------------------------------');

charm.write('\n'); // end
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