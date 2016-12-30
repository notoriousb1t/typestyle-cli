"use strict";
const writer_1 = require("./writer");
const argv = process.argv.slice(2);
const entry = argv[0] || 'site.ts';
console.log(entry);
// launch real main script
const w = writer_1.writer({ entry: entry });
console.log(`reading from ${w.inputFile}`);
w.buildCSS();
console.log(`writing to ${w.outputFile}`);
w.writeToFileSync();
