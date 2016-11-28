var TypeStyleWriter = require('./TypeStyleWriter').TypeStyleWriter;
var fs = require('fs');
var path = require('path');

var argv = process.argv.slice(2);
var entry = argv[0];

// launch real main script
var writer = new TypeStyleWriter();
writer.setup({
    entry: entry
});

console.log(`reading from ${writer.inputFile}`);
writer.buildCSS();

console.log(`writing to ${writer.outputFile}`);
writer.writeToFileSync();
