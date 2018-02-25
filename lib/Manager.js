const promptly = require('promptly');
const chalk = require('chalk');

const Pack = require('./Pack');
const utils = require('./utils');

class Manager {
  /**
   * Constructor
   * @param {Boolean} cli - true if starts in cli mode.
   */
  constructor(cli = false) {
    this.cli = cli;
    this.config = utils.config.getGlobal();
    this.packs = (utils.config.packs || []).map(pack => new Pack(pack));
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

      utils.config.create({
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
   * @param {String=} packName
   * @param {String=} global
   */
  list(packName, global) {
    let table;

    try {
      const data = global ? this.config.packs : utils.config.getLocal().packs;

      if (packName) {
        const pack = utils.find.pack(data, packName);
        table = utils.draw.filesList(pack.files);
      } else {
        table = utils.draw.packsList(data);
      }

      console.log(table.toString());
    } catch (err) {
      console.log(chalk.red(err));
    }
  }
}

module.exports = Manager;
