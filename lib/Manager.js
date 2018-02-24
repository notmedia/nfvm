const promptly = require('promptly');
const chalk = require('chalk');
const Table = require('cli-table-redemption');

const config = require('./utils/config');

class Manager {
  /**
   * Constructor
   * @param {Boolean} cli - true if starts in cli mode.
   */
  constructor(cli = false) {
    this.cli = cli;
    this.config = config.get();
  }

  /**
   * Initialize config
   */
  async initialize() {
    try {
      const name = await promptly.prompt(chalk.green('Pack name:'));
      const defaultVersion = await promptly.prompt(chalk.green('Default version: (default)'), {
        default: 'default',
      });
      const removeFileIfVersionNotExists = await promptly.confirm(chalk.green('Remove file if version not exists? (y/n)'));

      config.create({
        packs: [{
          name,
          defaultVersion,
          removeFileIfVersionNotExists,
          files: [],
        }],
      });
    } catch (err) {
      console.log(chalk.red(err));
    }
  }

  /**
   * Creates new pack of files or new version of pack
   * @param {String} packName
   * @param {String} version
   */
  create(packName, version = null) {
  }

  /**
   * Removes pack or pack version
   * @param {String} packName
   * @param {String} version
   */
  remove(packName, version = null) {
  }

  /**
   * Sets the given version of pack
   * @param {String} packName
   * @param {String} version
   */
  set(packName, version = 'default') {
  }

  /**
   * Show list of packs or pack files
   * @param {String=} pack - pack name
   * @param {String=} global
   */
  list(pack, global) {
    if (global) {
      const table = new Table({
        head: [
          chalk.keyword('orange').bold('ID'),
          chalk.keyword('orange').bold('Pack'),
          chalk.keyword('orange').bold('Default Version'),
          chalk.keyword('orange').bold('Version'),
          chalk.keyword('orange').bold('Files'),
          chalk.keyword('orange').bold('RFIVNE'),
        ],
        colAligns: ['middle', 'left', 'left', 'left', 'middle', 'middle'],
      });

      this.config.packs.forEach((item, index) => {
        table.push([
          ++index,
          item.name,
          item.defaultVersion,
          item.currentVersion,
          item.files.length,
          item.removeFileIfVersionNotExists ? chalk.green('on') : chalk.red('off'),
        ]);
      });

      console.log(table.toString());
    } else {
      console.log('Pack files list');
    }
  }
}

module.exports = Manager;
