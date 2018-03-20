const path = require('path');
const chalk = require('chalk');
const inquirer = require('inquirer');

inquirer.registerPrompt('filePath', require('inquirer-file-path'));
inquirer.registerPrompt('directory', require('inquirer-directory'));

module.exports.pack = {
  /**
   * Asks user for create pack
   * @param {String=} packname
   */
  create: async (packname) => {
    const name = packname || await inquirer.prompt({
      type: 'input',
      name: 'name',
      message: chalk.green('Pack name:'),
    }).then(answers => answers.name);

    const answers = await inquirer.prompt([{
      type: 'input',
      name: 'defaultVersion',
      message: chalk.green('Default version:'),
      default: 'default',
    }, {
      type: 'confirm',
      name: 'removeFileIfVersionNotExists',
      message: chalk.green('Remove file if version not exists?'),
    }]);

    return {
      name,
      ...answers,
      currentVersion: answers.defaultVersion,
      versions: [answers.defaultVersion],
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
    const filename = name || await inquirer.prompt({
      type: 'input',
      name: 'filename',
      message: chalk.green('File name:'),
    }).then(answers => answers.filename);

    const destinationPath = await inquirer.prompt({
      type: 'directory',
      name: 'destinationPath',
      message: chalk.green('Destination path:'),
      basePath: process.env.HOME,
    }).then(answers => path.resolve(process.env.HOME, answers.destinationPath, filename));

    const symlink = await inquirer.prompt({
      type: 'confirm',
      name: 'symlink',
      default: 'Y',
      message: chalk.green('Turn on symlink mode?'),
    }).then(answers => answers.symlink);

    return {
      filename,
      destinationPath,
      symlink,
      versions: [],
    };
  },

  /**
   * Asks user for create file version
   * @param {String=} versionName
   */
  createVersion: async (versionName) => {
    const name = versionName || await inquirer.prompt({
      type: 'input',
      name: 'name',
      message: chalk.green('File version name:'),
    }).then(answers => answers.name);

    const sourcePath = await inquirer.prompt({
      type: 'filePath',
      name: 'sourcePath',
      message: chalk.green('Source path:'),
      basePath: process.env.HOME,
    }).then(answers => answers.sourcePath);

    return {
      name,
      sourcePath,
    };
  },
};
