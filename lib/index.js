// load typescript environment
require('ts-node').register({
  project: 'tsconfig.json'
});

// launch real main script
require('./main.ts');
