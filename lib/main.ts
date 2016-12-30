import { writer } from './writer';
import * as fs from 'fs';
import * as path from 'path';

const argv = process.argv.slice(2);
const entry = argv[0];
console.log(entry)

// launch real main script
const w = writer({ entry: entry })

console.log(`reading from ${w.inputFile}`);
w.buildCSS();

console.log(`writing to ${w.outputFile}`);
w.writeToFileSync();
