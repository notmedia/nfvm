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
   * @param {String=} name - file name
   * @param {Boolean=} global - global mode
   */
  create: async (name, global) => {
    const filename = name || await inquirer.prompt({
      type: 'input',
      name: 'filename',
      message: chalk.green('File name:'),
    }).then(answers => answers.filename);

    const destinationPath = await inquirer.prompt({
      type: 'directory',
      name: 'destinationPath',
      message: chalk.green('Destination path:'),
      basePath: global ? process.env.HOME : process.env.PWD,
    }).then(answers => path.resolve(process.env.HOME, answers.destinationPath, filename));

    const answers = await inquirer.prompt([{
      type: 'confirm',
      name: 'symlink',
      default: 'Y',
      message: chalk.green('Turn on symlink mode?'),
    }, {
      type: 'confirm',
      name: 'removeFileIfVersionNotExists',
      default: 'Y',
      message: chalk.green('Remove file if version not exists?'),
    }]);

    return {
      filename,
      destinationPath,
      ...answers,
      versions: [],
    };
  },

  /**
   * Asks user for create file version
   * @param {String=} name - version name
   * @param {Boolean=} global - global mode
   */
  createVersion: async (name, global = false) => {
    const versionName = name || await inquirer.prompt({
      type: 'input',
      name: 'name',
      message: chalk.green('File version name:'),
    }).then(answers => answers.name);

    const sourcePath = await inquirer.prompt({
      type: 'filePath',
      name: 'sourcePath',
      message: chalk.green('Source path:'),
      basePath: global ? process.env.HOME : process.env.PWD,
    }).then(answers => answers.sourcePath);

    return {
      versionName,
      sourcePath,
    };
  },
};
