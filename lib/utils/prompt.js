const promptly = require('promptly');
const chalk = require('chalk');

const find = require('./find');

module.exports.pack = {
  /**
   * Asks user for create pack
   * @param {String=} packName
   */
  create: async (packName) => {
    const name = packName || await promptly.prompt(chalk.green('Pack name:'));
    const defaultVersion = await promptly.prompt(chalk.green('Default version: (default)'), {
      default: 'default',
    });
    const removeFileIfVersionNotExists = await promptly.confirm(chalk.green('Remove file if version not exists? (y/n)'));

    return {
      name,
      defaultVersion,
      currentVersion: defaultVersion,
      removeFileIfVersionNotExists,
      files: [],
    };
  },

  /**
   * Asks user for create pack version
   * @param {Objcect} pack
   */
  createVersion: async (pack) => {
    const name = await promptly.prompt(chalk.green('Pack version name:'), {
      validator: value => find.packVersion(pack, value),
    });

    return {
      name,
    };
  },
};
