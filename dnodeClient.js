var dnode = require('dnode');

var d = dnode.connect(5004);
d.on('remote', function (remote) {
    remote.startGame('user1', function (s) {
        console.log('beep => ' + s);
        d.end();
    });
});
