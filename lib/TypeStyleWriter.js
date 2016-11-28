var fs = require('fs');
var path = require('path');
var typestyle = require('typestyle');

function TypeStyleWriter() {
    this.inputFile = '';
    this.outputFile = '';
    this._contents = '';
}

TypeStyleWriter.prototype = {
  setup: function (options) {
    var entry = options.entry;
    var cwd = options.cwd || process.cwd();
    var inputFile = path.join(cwd, entry);

    var outputExt = '.css';
    var relativePath = path.relative(__dirname, inputFile);
    var inputParts = path.parse(inputFile);
    var outputFile = path.join(inputParts.dir, inputParts.name + outputExt);

    this.inputFile = relativePath;
    this.outputFile = outputFile;
  },
  buildCSS: function() {
    this.ensureBuildable();

    // clear typestyle
    typestyle.reinit();

    // include typescript files
    console.log(this.inputFile);
    require(this.inputFile);

    this._contents = typestyle.css();
    console.log(this._contents);

    // clear typestyle
    typestyle.reinit();
  },
  /**
   * Get the contents of the CSS (mostly for testing purposes)
   */
  getContents: function() {
    return this._contents;
  },

  /**
   * write the css out to file synchronously
   */
  writeToFileSync: function() {
    this.ensureWritable();
    fs.writeFileSync(this.outputFile, this._contents)
  },
  /**
   * Write the css out to a file
   */
  writeToFile: function(callback) {
    this.ensureWritable();
    return fs.writeFile(this.outputFile, this._contents, callback)
  },
  /**
   *  Throw an error if buildCSS cannot be called
   */
  ensureBuildable: function() {
    if (!this.inputFile) {
      throw Error('Input file has not been set');
    }
  },
  /**
   *  Throw an error if write cannot be called
   */
  ensureWritable: function() {
    if (!this.outputFile) {
      throw Error('Output file has not been set');
    }
  }
};

exports.TypeStyleWriter = TypeStyleWriter;
