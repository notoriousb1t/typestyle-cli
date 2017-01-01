'use strict';

var fs = require('fs');
var path = require('path');
var typestyle = require('typestyle');

var chalk$1 = require('chalk');
var out = function () {
    console.log(Array.prototype.join.call(arguments, ''));
};
var err = function () {
    console.log(chalk$1.red(Array.prototype.join.call(arguments, '')));
};

var parseOptions = function () {
    var options = {
        inputFiles: [],
        outputFiles: [],
        relativePaths: []
    };
    var args = process.argv;
    for (var i = 2, len = args.length; i < len; i++) {
        var arg = args[i];
        options.inputFiles.push(arg);
    }
    var cwd = process.cwd();
    for (var i = 0, len = options.inputFiles.length; i < len; i++) {
        var entry = options.inputFiles[i];
        var inputFile = path.join(cwd, entry);
        var outputExt = '.css';
        var relativePath = path.relative(__dirname, inputFile);
        var inputParts = path.parse(inputFile);
        options.relativePaths[i] = relativePath;
        options.outputFiles[i] = path.join(inputParts.dir, inputParts.name + outputExt);
    }
    return options;
};

var chalk = require('chalk');
var tsNode = require('ts-node');
out("registering typescript environment");
tsNode.register({
    ignore: true,
    compilerOptions: {
        module: 'commonjs',
    }
});
out("reading commendline options");
var options = parseOptions();
if (!options.inputFiles.length) {
    console.error('ERROR: an entry file was not specified');
    process.exit();
}
if (!options.inputFiles.length) {
    err('Input file has not been set');
    process.exit(1);
}
if (!options.outputFiles.length) {
    err('Output file has not been set');
    process.exit(1);
}
for (var i = 0, len = options.inputFiles.length; i < len; i++) {
    var inputFile = options.inputFiles[i];
    var outputFile = options.outputFiles[i];
    var relativePath = options.relativePaths[i];
    out('reading from ', chalk.green(inputFile));
    typestyle.reinit();
    require(relativePath);
    var contentString = typestyle.getStyles();
    out('writing to ', chalk.green(outputFile));
    fs.writeFileSync(outputFile, contentString, { encoding: 'utf8' });
}
out('done!');
process.exit(0);
