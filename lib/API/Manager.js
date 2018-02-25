const chalk = require('chalk');

const Pack = require('./Pack');
const utils = require('../utils');

class Manager {
  /**
   * Constructor
   * @param {Boolean} cli - true if starts in cli mode.
   */
  constructor(cli = false) {
    this.cli = cli;
  }

  /**
   * Loads current config
   * @param {Boolean} global
   */
  loadConfig(global) {
    this.config = global ? utils.config.getGlobal() : utils.config.getLocal();
    this.packs = (utils.config.packs || []).map(pack => new Pack(pack));
  }
  /**
   * Initialize config
   */
  async initialize() {
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
   * @param {String=} global
   */
  async createPack(packName, version, folder, global) {
    try {
      this.loadConfig(global);

      if (version) {
        const pack = utils.find.pack(this.packs, packName);
        if (pack) {
          const version = await utils.prompt.pack.createVersion();
        }
        pack.createVersio();
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
      this.loadConfig(global);

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
