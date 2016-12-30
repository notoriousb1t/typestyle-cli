#!/usr/bin/env node
import * as child_process from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

console.log("starting...");
const argv = process.argv.slice(2);
const tsNode = path.join(__dirname, '../node_modules/.bin/ts-node');
const mainTs = path.join(__dirname, 'main.js');

const compilerOptions = {
  "module": "commonjs"
};

const scriptArgs = [tsNode, '--ignore', '-F', '-O', JSON.stringify(compilerOptions), mainTs];

const proc = child_process.spawn(
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