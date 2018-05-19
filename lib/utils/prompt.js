const path = require('path');
const chalk = require('chalk');
const inquirer = require('inquirer');

inquirer.registerPrompt('filePath', require('inquirer-file-path'));
inquirer.registerPrompt('directory', require('inquirer-directory'));

module.exports.pack = {
  /**
   * Asks user for create pack
   * @param {String=} packname
   * @param {String[]=} existingPacks - array of existing packs names
   */
  create: async (packname, existingPacks = []) => {
    const answers = await inquirer.prompt([{
      type: 'input',
      name: 'name',
      message: chalk.green('Pack name:'),
      default: packname,
      validate: function validatePackCreate(value) {
        const done = this.async();

        if (existingPacks.indexOf(value) !== -1) {
          done(`Pack ${value} already exists.`);
          return;
        }

        done(null, true);
      },
    }, {
      type: 'input',
      name: 'defaultVersion',
      message: chalk.green('Default version:'),
      default: 'default',
    }]);

    return {
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
   * @param {String[]=} existingFiles- array of existing filenames in packs
   * @param {Boolean=} global - global mode
   */
  create: async (name, existingFiles = [], global = false) => {
    const basePath = global ? process.env.HOME : process.env.PWD;

    const filename = await inquirer.prompt({
      type: 'input',
      name: 'filename',
      message: chalk.green('File name:'),
      default: name,
      validate: function validateFileCreate(value) {
        const done = this.async();

        if (existingFiles.indexOf(value) !== -1) {
          done(`File ${value} already exists.`);
          return;
        }

        done(null, true);
      },
    }).then(answers => answers.filename);

    const destinationPath = await inquirer.prompt({
      type: 'directory',
      name: 'destinationPath',
      message: chalk.green('Destination path:'),
      basePath: global ? process.env.HOME : process.env.PWD,
    }).then(answers => path.resolve(basePath, answers.destinationPath));

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
   * @param {String[]=} existingFileVersions- array of existing file
   * versions
   * @param {Boolean=} global - global mode
   */
  createVersion: async (name, existingFileVersions = [], global = false) => {
    const basePath = global ? process.env.HOME : process.env.PWD;

    const versionName = await inquirer.prompt({
      type: 'input',
      name: 'name',
      message: chalk.green('File version name:'),
      default: name,
      validate: function validateFileVersionCreate(value) {
        const done = this.async();

        if (existingFileVersions.indexOf(value) !== -1) {
          done(`File version ${value} already exists.`);
          return;
        }

        done(null, true);
      },
    }).then(answers => answers.name);

    const sourcePath = await inquirer.prompt({
      type: 'filePath',
      name: 'sourcePath',
      message: chalk.green('Source path:'),
      basePath,
    }).then(answers => path.resolve(basePath, answers.sourcePath));

    return {
      versionName,
      sourcePath,
    };
  },
};
