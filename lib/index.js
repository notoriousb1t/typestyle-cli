'use strict';

var path = require('path');
var fs = require('fs');
var typestyle = require('typestyle');

function writer(options) {
    var contentString = '';
    var entry = options.entry;
    var cwd = options.cwd || process.cwd();
    var inputFile = path.join(cwd, entry);
    var outputExt = '.css';
    var relativePath = path.relative(__dirname, inputFile);
    var inputParts = path.parse(inputFile);
    var outputFile = path.join(inputParts.dir, inputParts.name + outputExt);
    var self = {
        inputFile: relativePath,
        outputFile: outputFile,
        buildCSS: function () {
            if (!relativePath) {
                throw Error('Input file has not been set');
            }
            typestyle.reinit();
            require(inputFile);
            contentString = typestyle.getStyles();
        },
        getContents: function () {
            return contentString;
        },
        writeToFileSync: function () {
            if (!outputFile) {
                throw Error('Output file has not been set');
            }
            fs.writeFileSync(outputFile, contentString, { encoding: 'utf8' });
        }
    };
    return self;
}

var tsNode = require('ts-node');
console.log("starting...");
var argv = process.argv.slice(2);
var mainTs = path.join(__dirname, 'main.js');
tsNode.register({
    ignore: true,
    compilerOptions: {
        module: 'commonjs',
    }
});
function createWriter() {
    var entry = process.argv[2];
    if (!entry) {
        console.error('ERROR: an entry file was not specified');
        process.exit();
    }
    return writer({ entry: entry });
}
var w = createWriter();
console.log("reading from " + w.inputFile);
var contents = w.buildCSS();
console.log("writing to " + w.outputFile);
w.writeToFileSync();
