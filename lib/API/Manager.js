const chalk = require('chalk');

const Pack = require('./Pack');
const utils = require('../utils');

class Manager {
  /**
   * Constructor
   * @param {Boolean} cli - true if starts in cli mode.
   */
  constructor(cli = false, global) {
    this.cli = cli;
    this.loadConfig(global);
  }

  /**
   * Loads current config
   * @param {Boolean} global
   */
  loadConfig(global = false) {
    this.config = global ? utils.config.getGlobal() : utils.config.getLocal();
    this.packs = (utils.config.packs || []).map(pack => new Pack(pack));
  }
  /**
   * Initialize config
   */
  static async initialize() {
    try {
      const pack = await utils.prompt.pack.create();
      utils.config.save({
        packs: [pack],
      });
    } catch (err) {
      console.log(chalk.red(err));
    }
  }

  /**
   * Creates new pack or new version of pack
   * @param {String} packName
   * @param {String=} version
   * @param {String=} folder
   */
  async createPack(packName, version, folder) {
    try {
      if (version) {
        const pack = utils.find.pack(this.packs, packName);
        if (pack) {
          pack.createVersion(version);
        }
      } else {
        const data = await utils.prompt.pack.create(packName);
        const pack = new Pack(data);
      }
    } catch (err) {
      console.log(chalk.red(err));
    }
  }

  /**
   * Creates new file or new version of file
   * @param {String} pack
   * @param {String=} version
   */
  createFile(pack, version) {
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
  list(packName) {
    let table;

    try {
      if (packName) {
        const pack = utils.find.pack(this.packs, packName);
        table = utils.draw.filesList(pack.files);
      } else {
        table = utils.draw.packsList(this.packs);
      }

      console.log(table.toString());
    } catch (err) {
      console.log(chalk.red(err));
    }
  }
}

module.exports = Manager;
