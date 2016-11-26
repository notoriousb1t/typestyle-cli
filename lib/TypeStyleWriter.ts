const fs = require('fs');
const path = require('path');
const typestyle = require('typestyle');


export class TypeStyleWriter {
  public inputFile: string;
  public outputFile: string;
  private _contents: string;

  constructor() {
    this.inputFile = '';
    this.outputFile = '';
    this._contents = '';
  }

  public setup(options: { entry: string, cwd?: string }): void {
    const entry = options.entry;
    const cwd = options.cwd || process.cwd();
    const inputFile = path.join(cwd, entry);

    const outputExt = '.css';
    const relativePath = path.relative(__dirname, inputFile);
    const inputParts = path.parse(inputFile);
    const outputFile = path.join(inputParts.dir, inputParts.name + outputExt);

    this.inputFile = relativePath;
    this.outputFile = outputFile;
  }

  public buildCSS(): void {
    this.ensureBuildable();

    // clear typestyle
    typestyle.reinit();

    // include typescript files
    require(this.inputFile);

    this._contents = typestyle.css();

    // clear typestyle
    typestyle.reinit();
  }

  /**
   * Get the contents of the CSS (mostly for testing purposes)
   */
  public getContents(): string {
    return this._contents;
  }

  /**
   * write the css out to file synchronously
   */
  public writeToFileSync(): void {
    this.ensureWritable();
    fs.writeFileSync(this.outputFile, this._contents)
  }

  /**
   * Write the css out to a file
   */
  public writeToFile(callback: Function): void {
    this.ensureWritable();
    return fs.writeFile(this.outputFile, this._contents, callback)
  }

  /**
   *  Throw an error if buildCSS cannot be called
   */
  private ensureBuildable(): void {
    if (!this.inputFile) {
      throw Error('Input file has not been set');
    }
  }

  /**
   *  Throw an error if write cannot be called
   */
  private ensureWritable(): void {
    if (!this.outputFile) {
      throw Error('Output file has not been set');
    }
    if (!this._contents) {
      throw Error('Typescript files have not yet been processed');
    }
  }
}
