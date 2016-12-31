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
    console.log(relativePath);
    inputFile = relativePath;
    outputFile = outputFile;
    var self = {
        inputFile: inputFile,
        outputFile: outputFile,
        buildCSS: function () {
            if (!inputFile) {
                throw Error('Input file has not been set');
            }
            typestyle.reinit();
            try {
                require(inputFile);
            }
            catch (err) {
                console.error(err);
                return;
            }
            contentString = typestyle.getStyles();
            console.log(typestyle.getStyles());
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
var entry = process.argv[2];
console.log(entry);
var w = writer({ entry: entry });
console.log("reading from " + w.inputFile);
w.buildCSS();
console.log("writing to " + w.outputFile);
w.writeToFileSync();
