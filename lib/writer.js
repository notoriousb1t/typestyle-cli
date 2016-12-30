"use strict";
const fs = require("fs");
const path = require("path");
const typestyle = require("typestyle");
function writer() {
    let inputFile = '';
    let outputFile = '';
    let contents = '';
    const self = {
        get inputFile() {
            return inputFile;
        },
        get outputFile() {
            return outputFile;
        },
        setup: function (options) {
            const entry = options.entry;
            const cwd = options.cwd || process.cwd();
            let inputFile = path.join(cwd, entry);
            const outputExt = '.css';
            const relativePath = path.relative(__dirname, inputFile);
            const inputParts = path.parse(inputFile);
            let outputFile = path.join(inputParts.dir, inputParts.name + outputExt);
            inputFile = relativePath;
            outputFile = outputFile;
        },
        buildCSS() {
            self.ensureBuildable();
            // clear typestyle
            typestyle.reinit();
            // include typescript files
            console.log(inputFile);
            require(inputFile);
            contents = typestyle.getStyles();
            console.log(contents);
            // clear typestyle
            typestyle.reinit();
        },
        /**
         * Get the contents of the CSS (mostly for testing purposes)
         */
        getContents() {
            return contents;
        },
        /**
         * write the css out to file synchronously
         */
        writeToFileSync() {
            self.ensureWritable();
            fs.writeFileSync(outputFile, contents);
        },
        /**
         * Write the css out to a file
         */
        writeToFile(callback) {
            self.ensureWritable();
            return fs.writeFile(outputFile, contents, callback);
        },
        /**
         *  Throw an error if buildCSS cannot be called
         */
        ensureBuildable() {
            if (!inputFile) {
                throw Error('Input file has not been set');
            }
        },
        /**
         *  Throw an error if write cannot be called
         */
        ensureWritable() {
            if (!outputFile) {
                throw Error('Output file has not been set');
            }
        }
    };
    return self;
}
exports.writer = writer;
