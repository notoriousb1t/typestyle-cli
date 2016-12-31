import nodeResolve from 'rollup-plugin-node-resolve';
import typescript from 'rollup-plugin-typescript'

module.exports = {
  entry: './src/index.ts',
  dest: './lib/index.js',
  format: 'cjs',
  external: ['fs', 'path'],
  plugins: [
    typescript({
      target: "es5",
      rootDir: "src",
      module: "es2015",
      declaration: true,
      preserveConstEnums: false,
      removeComments: true,
      typescript: require('typescript'),
      noImplicitAny: true,
      inlineSourceMap: false,
      sourceMap: false
    }),
    nodeResolve({
      // use "module" field for ES6 module if possible
      module: true,
      jsnext: true,
      main: true,
      skip: ['typescript', 'typestyle'],
      browser: false,
      extensions: ['.js'],
      preferBuiltins: true
    })
  ]
};
