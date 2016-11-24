var tsNode = require('ts-node');

// load typescript environment
var tsNodeInstance = tsNode.register({
  // turn this off once we can figure out how to get it to compile otherwise
  fast: true,
  project: false,
  compilerOptions: {
    "target": "es2015",
    "lib": [
      "es2015"
    ],
    "module": "commonjs",
    "noEmitOnError": true
  }
});

// launch real main script
require('./main');
