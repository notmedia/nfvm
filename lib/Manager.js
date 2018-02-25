const promptly = require('promptly');
const chalk = require('chalk');
const Table = require('cli-table-redemption');

const Pack = require('./Pack');
const config = require('./utils/config');

class Manager {
  /**
   * Constructor
   * @param {Boolean} cli - true if starts in cli mode.
   */
  constructor(cli = false) {
    this.cli = cli;
    this.config = config.getGlobal();
    this.packs = (config.packs || []).map(pack => new Pack(pack));
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
   * Creates new pack or new version of pack
   * @param {String} pack
   * @param {String=} version
   * @param {String=} folder
   * @param {String=} global
   */
  createPack(pack, version, folder, global) {

  }

  /**
   * Creates new file or new version of file
   * @param {String} pack
   * @param {String=} version
   * @param {String=} global
   */
  createFile(pack, version, global) {

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
   * @param {String=} pack
   * @param {String=} global
   */
  list(pack, global) {
    if (global) {
      const table = new Table({
        head: [
          chalk.hex('#F6670E').bold('ID'),
          chalk.hex('#F6670E').bold('Pack'),
          chalk.hex('#F6670E').bold('Default Version'),
          chalk.hex('#F6670E').bold('Version'),
          chalk.hex('#F6670E').bold('Files'),
          chalk.hex('#F6670E').bold('RFIVNE'),
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
          item.removeFileIfVersionNotExists ? chalk.green.bold('on') : chalk.red.bold('off'),
        ]);
      });

      console.log(table.toString());
    } else {
      console.log('Pack files list');
    }
  }
}

module.exports = Manager;
