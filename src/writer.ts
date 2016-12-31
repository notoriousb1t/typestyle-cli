import * as fs from 'fs';
import * as path from 'path';
import { reinit, getStyles } from 'typestyle';

export function writer(options: { entry: string, cwd?: string }) {
  let contentString = '';

  const entry = options.entry;
  const cwd = options.cwd || process.cwd();
  let inputFile = path.join(cwd, entry);

  const outputExt = '.css';
  const relativePath = path.relative(__dirname, inputFile);
  const inputParts = path.parse(inputFile);
  const outputFile = path.join(inputParts.dir, inputParts.name + outputExt);

  const self = {
    inputFile: relativePath,
    outputFile: outputFile,
    buildCSS(): void {
      if (!relativePath) {
        throw Error('Input file has not been set');
      }

      // clear typestyle
      reinit();

      // include typescript files
      require(inputFile);

      // get output
      contentString = getStyles();
    },
    /**
     * Get the contents of the CSS (mostly for testing purposes)
     */
    getContents(): string {
      return contentString;
    },
    /**
     * write the css out to file synchronously
     */
    writeToFileSync(): void {
      if (!outputFile) {
        throw Error('Output file has not been set');
      }
      fs.writeFileSync(outputFile, contentString, { encoding: 'utf8' });
    }
  };
  return self;
}
