const chalk = require('chalk');

const Pack = require('./Pack');
const utils = require('../utils');

/**
 * Loads current config
 * @private
 * @param {Boolean} global
 */
function loadConfig(global = false) {
  try {
    this.config = global ? utils.config.getGlobal() : utils.config.getLocal();
    this.packs = (this.config.packs || []).map(pack => new Pack(pack));
  } catch (error) {
    throw new Error('Can not load .nfvmrc.json configuration file.');
  }
}

/**
 * Creates or updates given pack in
 * the manager packs list
 * @private
 * @param {Object} pack
 */
function createOrUpdatePack(pack) {
  const index = this.packs.findIndex(item => item.name === pack.name);
  if (index !== -1) {
    this.packs[index] = pack;
  } else {
    this.packs.push(pack);
  }

  this.config.packs = this.packs;
}

/**
 * Updates nfvm config
 * @private
 */
function updateConfig() {
  utils.config.save(this.config, this.global);
}

class Manager {
  /**
   * Constructor
   * @param {Boolean} cli - true if starts in cli mode.
   * @param {Boolean} global
   */
  constructor(cli = false, global = false) {
    this.cli = cli;
    this.global = global;
    loadConfig.call(this, global);
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
      let pack;
      if (version) {
        pack = utils.find.pack(this.packs, packName);
        pack.createVersion(version);
      } else {
        const data = await utils.prompt.pack.create(packName);
        pack = new Pack(data);
      }

      createOrUpdatePack.call(this, pack.getData());
      updateConfig.call(this);
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
