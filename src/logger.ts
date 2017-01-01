const chalk = require('chalk');

export const out: { (...parts: string[]) } = function () {
  console.log(Array.prototype.join.call(arguments, ''));
};

export const err: { (...parts: string[]) } = function () {
  console.log(chalk.red(Array.prototype.join.call(arguments, '')));
};
