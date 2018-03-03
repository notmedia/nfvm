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
}

/**
 * Remove pack from the manager packs list
 * @private
 * @param {Objcet} pack
 */
function removePack(pack) {
  const index = this.packs.findIndex(item => item.name === pack.name);
  if (index !== -1) {
    this.packs.splice(index, 1);
  }
}

/**
 * Updates nfvm config
 * @private
 */
function updateConfig() {
  this.config.packs = this.packs.map(item => item.getData());
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
   * @param {String} packname
   * @param {String} version
   * @param {String} folder - TODO: add create pack or pack version from folder
   */
  async createPack(packname, version, folder) {
    try {
      let pack;
      if (version) {
        pack = utils.find.pack(this.packs, packname);
        pack.createVersion(version);
      } else {
        const data = await utils.prompt.pack.create(packname);
        pack = new Pack(data);
      }

      createOrUpdatePack.call(this, pack);
      updateConfig.call(this);
    } catch (err) {
      console.log(chalk.red(err));
    }
  }

  /**
   * Removes pack or version of pack
   * @param {String} packname
   * @param {String} version
   */
  removePack(packname, version) {
    try {
      const pack = utils.find.pack(this.packs, packname);
      if (version) {
        pack.removeVersion(version);
      } else {
        removePack.call(this, pack);
      }

      updateConfig.call(this);
    } catch (err) {
      console.log(chalk.red(err));
    }
  }

  /**
   * Creates new file or new version of file
   * @param {String} packname
   * @param {String} filename
   * @param {String} version
   * @param {String} folder - TODO: add create file or file version from folder
   */
  async createFile(packname, filename, version, folder) {
    try {
      const pack = utils.find.pack(this.packs, packname);
      if (version) {
        await pack.createFileVersion(filename, version);
      } else {
        await pack.createFile(filename);
      }

      createOrUpdatePack.call(this, pack);
      updateConfig.call(this);
    } catch (err) {
      console.log(chalk.red(err));
    }
  }

  /**
   * Removes file or version of file
   * @param {String} packname
   * @param {String} filename
   * @param {String} version
   */
  removeFile(packname, filename, version) {
    try {
      const pack = utils.find.pack(this.packs, packname);
      if (version) {
        pack.removeFileVersion(filename, version);
      } else {
        pack.removeFile(filename);
      }

      updateConfig.call(this);
    } catch (err) {
      console.log(chalk.red(err));
    }
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
   * @param {String} packName
   * @param {String} global
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
