import { TypeStyleWriter } from './TypeStyleWriter';
import * as fs from 'fs';
import * as path from 'path';

// launch real main script
const writer = new TypeStyleWriter();
writer.setup({
    entry: 'typestyle-cli/test/cases/style-is-correctly-compiled.ts'
});

writer.buildCSS();
writer.writeToFileSync();
