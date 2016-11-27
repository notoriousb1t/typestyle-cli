import { TypeStyleWriter } from './TypeStyleWriter';
import * as fs from 'fs';
import * as path from 'path';

const argv = process.argv.slice(2);
const entry = argv[0];

// launch real main script
const writer = new TypeStyleWriter();
writer.setup({
    entry: entry
});

console.log(`reading from ${writer.inputFile}`);
writer.buildCSS();

console.log(`writing to ${writer.outputFile}`);
writer.writeToFileSync();
