import { TypeStyleWriter } from '../../lib/TypeStyleWriter';
import * as assert from 'assert';

describe('TypeStyleWriter', () => {

  describe('setup', () => {

    it('calculates the input file correct', () => {
      const writer = new TypeStyleWriter();
      writer.setup({
        entry: './site.ts',
        cwd: './working-directory'
      });
      assert.equal(writer.inputFile, '../working-directory/site.ts');
    });

    it('defaults the output to the filename with ext .css', () => {
      const writer = new TypeStyleWriter();
      writer.setup({
        entry: './site.ts',
        cwd: './working-directory'
      });
      assert.equal(writer.outputFile, 'working-directory/site.css');
    });
  });

  describe('buildCSS', () => {
    it('style-is-correctly-compiled', () => {
      const writer = new TypeStyleWriter();
      writer.setup({
        entry: 'test/cases/style-is-correctly-compiled.ts'
      });
      writer.buildCSS();

      const output = writer.getContents();
      assert.equal(output, '.f1jvcvsh{color:red}');
    });
  });
});
