const promptly = require('promptly');
const chalk = require('chalk');

module.exports.create = {
  pack: async () => {
    const name = await promptly.prompt(chalk.green('Pack name:'));
    const defaultVersion = await promptly.prompt(chalk.green('Default version: (default)'), {
      default: 'default',
    });
    const removeFileIfVersionNotExists = await promptly.confirm(chalk.green('Remove file if version not exists? (y/n)'));

    return {
      name,
      defaultVersion,
      removeFileIfVersionNotExists,
      files: [],
    };
  },
};
