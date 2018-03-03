const promptly = require('promptly');
const chalk = require('chalk');

module.exports.pack = {
  /**
   * Asks user for create pack
   * @param {String=} packname
   */
  create: async (packname) => {
    const name = packname || await promptly.prompt(chalk.green('Pack name:'));
    const defaultVersion = await promptly.prompt(chalk.green('Default version: (default)'), {
      default: 'default',
    });
    const removeFileIfVersionNotExists = await promptly.confirm(chalk.green('Remove file if version not exists? (y/n)'));

    return {
      name,
      defaultVersion,
      currentVersion: defaultVersion,
      versions: [defaultVersion],
      removeFileIfVersionNotExists,
      files: [],
    };
  },
};

module.exports.file = {
  /**
   * Asks user for create file
   * @param {String=} name
   */
  create: async (name) => {
    const filename = name || await promptly.prompt(chalk.green('File name:'));
    const destinationPath = await promptly.prompt(chalk.green('Destination path:'));

    return {
      filename,
      destinationPath,
      versions: [],
    };
  },

  /**
   * Asks user for create file version
   * @param {String=} versionName
   */
  createVersion: async (versionName) => {
    const name = versionName || await promptly.prompt(chalk.green('File version name:'));
    const sourcePath = await promptly.prompt(chalk.green('Source path:'));

    return {
      name,
      sourcePath,
    };
  },
};
