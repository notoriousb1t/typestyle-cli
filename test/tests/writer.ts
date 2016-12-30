import { watchFile } from 'fs';
import { writer } from '../../lib/writer';
import * as assert from 'assert';

describe('TypeStyleWriter', () => {

  describe('setup', () => {

    it('calculates the input file correct', () => {
      const w = writer({
        entry: './site.ts',
        cwd: './working-directory'
      });
      assert.equal(w.inputFile, '../working-directory/site.ts');
    });

    it('defaults the output to the filename with ext .css', () => {
      const w = writer({
        entry: './site.ts',
        cwd: './working-directory'
      });
      assert.equal(w.outputFile, 'working-directory/site.css');
    });
  });

  describe('buildCSS', () => {
    it('style-is-correctly-compiled', () => {
      const w = writer({
        entry: 'test/cases/style-is-correctly-compiled.ts'
      });
      w.buildCSS();

      const output = w.getContents();
      assert.equal(output, '.f1jvcvsh{color:red}');
    });
  });
});
