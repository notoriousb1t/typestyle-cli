import * as child_process from 'child_process';
import * as fs from 'fs';
import { out, err } from './logger';
import { parseOptions } from './options';
import { reinit, getStyles } from 'typestyle';

const chalk = require('chalk');
const tsNode = require('ts-node');

out("registering typescript environment");
tsNode.register({
  ignore: true,
  compilerOptions: {
    module: 'commonjs',
  }
});

out("reading commendline options");
const options = parseOptions();
if (!options.inputFiles.length) {
  console.error('ERROR: an entry file was not specified');
  process.exit();
}

// validate options from the commandline
if (!options.inputFiles.length) {
  err('Input file has not been set');
  process.exit(1);
}
if (!options.outputFiles.length) {
  err('Output file has not been set');
  process.exit(1);
}

// rebuild and write out all targets
for (let i = 0, len = options.inputFiles.length; i < len; i++) {
  const inputFile = options.inputFiles[i];
  const outputFile = options.outputFiles[i];
  const relativePath = options.relativePaths[i];

  out('reading from ', chalk.green(inputFile));
  // clear typestyle
  reinit();

  // include typescript files
  require(relativePath);

  // get output
  const contentString = getStyles();

  out('writing to ', chalk.green(outputFile));
  fs.writeFileSync(outputFile, contentString, { encoding: 'utf8' });
}

out('done!');
process.exit(0);
