import * as path from 'path';

export const parseOptions = (): CommandLineOptions => {
  const options = {
    inputFiles: [],
    outputFiles: [],
    relativePaths: []
  };

  // read all options from the commandline
  const args = process.argv;
  for (let i = 2, len = args.length; i < len; i++) {
    const arg = args[i];

    // else add to list of inputs
    options.inputFiles.push(arg);
  }

  // get current directly
  const cwd = process.cwd();

  // calculate outputs based on input names
  for (let i = 0, len = options.inputFiles.length; i < len; i++) {
    const entry = options.inputFiles[i];
    let inputFile = path.join(cwd, entry);

    const outputExt = '.css';
    const relativePath = path.relative(__dirname, inputFile);
    const inputParts = path.parse(inputFile);

    options.relativePaths[i] = relativePath;
    options.outputFiles[i] = path.join(inputParts.dir, inputParts.name + outputExt);
  }

  return options;
};

export type CommandLineOptions = {
  inputFiles: string[];
  outputFiles: string[];
  relativePaths: string[];
};
