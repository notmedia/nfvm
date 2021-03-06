const Listr = require('listr');

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
 * @param {Object} pack
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
    const pack = await utils.prompt.pack.create();
    utils.config.save({
      packs: [pack],
    });
  }

  /**
   * Creates new pack or new version of pack
   * @param {String} packname
   * @param {String} version
   */
  async createPack(packname, version) {
    let pack;
    if (version) {
      pack = utils.find.pack(this.packs, packname);
      pack.createVersion(version);
    } else {
      const data = await utils.prompt.pack
        .create(packname, this.packs.map(item => item.name));
      pack = new Pack(data);
    }

    createOrUpdatePack.call(this, pack);
    updateConfig.call(this);
  }

  /**
   * Removes pack or version of pack
   * @param {String} packname
   * @param {String} version
   */
  async removePack(packname, version) {
    const pack = utils.find.pack(this.packs, packname);
    if (version) {
      await pack.removeVersion(version);
    } else {
      removePack.call(this, pack);
    }

    updateConfig.call(this);
  }

  /**
   * Creates new file or new version of file
   * @param {String} packname
   * @param {String} filename
   * @param {String} version
   */
  async createFile(packname, filename, version) {
    const pack = utils.find.pack(this.packs, packname);
    if (version) {
      await pack.createFileVersion(filename, version, this.global);
    } else {
      await pack.createFile(filename, this.global);
    }

    createOrUpdatePack.call(this, pack);
    updateConfig.call(this);
  }

  /**
   * Removes file or version of file
   * @param {String} packname
   * @param {String} filename
   * @param {String} version
   */
  removeFile(packname, filename, version) {
    const pack = utils.find.pack(this.packs, packname);
    if (version) {
      pack.removeFileVersion(filename, version);
    } else {
      pack.removeFile(filename);
    }

    updateConfig.call(this);
  }

  /**
   * Sets the given version of pack
   * @param {String} packname
   * @param {String} version
   */
  async set(packname, version) {
    const pack = utils.find.pack(this.packs, packname);

    const tasks = new Listr([{
      title: `${pack.name} from ${pack.currentVersion} to ${version}`,
      task: () => new Listr(pack.setVersion(version)),
    }]);

    await tasks.run();

    updateConfig.call(this);
  }

  /**
   * Show list of packs or pack files
   * @param {String} packname
   * @param {String} global
   */
  list(packname) {
    if (packname) {
      const pack = utils.find.pack(this.packs, packname);
      utils.draw.packInfo(pack);
    } else {
      console.log(utils.draw.packsList(this.packs).toString());
    }
  }
}

module.exports = Manager;
