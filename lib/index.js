#!/usr/bin/env node

var spawn = require('child_process').spawn;
var fs = require('fs');
var path = require('path');

console.log("starting...");
var argv = process.argv.slice(2);
var tsNode = path.join(__dirname, '../node_modules/.bin/ts-node');
var mainTs = path.join(__dirname, 'main.ts');

var compilerOptions = {
  "module": "commonjs"
};

var scriptArgs = [tsNode, '--ignore', '-F', '-O', JSON.stringify(compilerOptions), mainTs];

var proc = spawn(
    process.execPath,
    scriptArgs.concat(argv),
    { stdio: 'inherit' }
);

proc.on('exit', function(code, signal) {
    process.on('exit', function() {
        console.log('exiting: ' + code);

        if (signal) {
            process.kill(process.pid, signal)
        } else {
            process.exit(code)
        }
    })
});
