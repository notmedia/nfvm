const Bluebird = require('bluebird');

const File = require('./File');
const utils = require('../utils');

/**
 * Creates or updates given file
 * @private
 * @param {Object} file
 */
function createOrUpdateFile(file) {
  const index = this.files.findIndex(item => item.filename === file.filename);
  if (index !== -1) {
    this.files[index] = file;
  } else {
    this.files.push(file);
  }
}

class Pack {
  /**
   * Constructor
   * @param {Object} pack
   */
  constructor(pack) {
    this.name = pack.name;
    this.defaultVersion = pack.defaultVersion;
    this.currentVersion = pack.currentVersion;
    this.versions = pack.versions || [pack.defaultVersion];
    this.files = pack.files.map(file => new File(file));
  }

  /**
   * Create new version of pack
   * @param {String} version
   */
  createVersion(version) {
    if (this.versions.indexOf(version) === -1) {
      this.versions.push(version);
    } else {
      throw new Error(`Version ${version} for pack ${this.name} already exists.`);
    }
  }

  /**
   * Removes pack version and all files of this version
   * @param {String} version
   */
  async removeVersion(version) {
    if (this.defaultVersion !== version) {
      const index = this.versions.findIndex(item => item === version);
      if (index !== -1) {
        this.versions.splice(index, 1);
        this.files.forEach(file => file.removeVersion(version));
      }

      if (this.currentVersion === version) {
        await this.setVersion(this.defaultVersion);
      }
    } else {
      throw new Error('You are trying to delete default version.');
    }
  }

  /**
   * Create new file
   * @param {String} filename
   * @param {Boolean=} global - global mode
   */
  async createFile(filename, global = false) {
    const data = await utils.prompt.file
      .create(filename, this.files.map(item => item.filename), global);
    const file = new File(data);

    createOrUpdateFile.call(this, file);
  }

  /**
   * Removes given file
   * @param {String} filename
   */
  removeFile(filename) {
    const index = this.files.findIndex(item => item.filename === filename);
    if (index !== -1) {
      this.files.splice(index, 1);
    }
  }

  /**
   * Create new version of file
   * @param {String} filename
   * @param {String} version
   * @param {Boolean=} global - global mode
   */
  async createFileVersion(filename, version, global = false) {
    const file = utils.find.file(this.files, filename);
    const data = await utils.prompt.file
      .createVersion(version, file.versions.map(item => item.versionName), global);

    file.createVersion(data);

    createOrUpdateFile.call(this, file);
  }

  /**
   * Remove file version
   * @param {String} filename
   * @param {String} version
   */
  removeFileVersion(filename, version) {
    const file = utils.find.file(this.files, filename);

    file.removeVersion(version);

    createOrUpdateFile.call(this, file);
  }

  /**
   * Set pack version
   * @param {String} version
   */
  async setVersion(version) {
    this.currentVersion = version;
    await Bluebird.map(this.files, file =>
      file.setVersion(version));
  }

  /**
   * Returns data for config
   */
  getData() {
    return {
      name: this.name,
      defaultVersion: this.defaultVersion,
      currentVersion: this.currentVersion,
      versions: this.versions,
      files: this.files.map(file => file.getData()),
    };
  }
}

module.exports = Pack;
