var spawn = require('child_process').spawn;
var fs = require('fs');
var path = require('path');

const tsNode = path.join(__dirname, '../node_modules/.bin/ts-node');
const mainTs = path.join(__dirname, 'main.ts');

var scriptArgs = [tsNode, '--fast', '--ignore', false, mainTs];

var proc = spawn(
    process.execPath,
    scriptArgs,
    { stdio: 'inherit' }
);

proc.on('exit', function(code, signal) {
    process.on('exit', function() {
        if (signal) {
            process.kill(process.pid, signal)
        } else {
            process.exit(code)
        }
    })
})
