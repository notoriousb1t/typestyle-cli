//#!/usr/bin/env node
import * as child_process from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
import { writer } from './writer';
var tsNode = require('ts-node');

console.log("starting...");
const argv = process.argv.slice(2);
const mainTs = path.join(__dirname, 'main.js');

const compilerOptions = {
  "module": "commonjs"
};

tsNode.register({
  ignore: true,
  compilerOptions: {
      module: 'commonjs',
  }
});

function createWriter() {
  const entry = process.argv[2];
  if (!entry){
    console.error('ERROR: an entry file was not specified');
    process.exit();
  }

  // launch real main script
  return writer({ entry: entry })
}

const w = createWriter();

console.log(`reading from ${w.inputFile}`);
const contents = w.buildCSS();

console.log(`writing to ${w.outputFile}`);
w.writeToFileSync();
