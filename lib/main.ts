import { writer } from './writer';
import * as fs from 'fs';
import * as path from 'path';

var argv = process.argv.slice(2);
var entry = argv[0];

// launch real main script
var w = writer();
w.setup({  entry: entry });

console.log(`reading from ${w.inputFile}`);
w.buildCSS();

console.log(`writing to ${w.outputFile}`);
w.writeToFileSync();
