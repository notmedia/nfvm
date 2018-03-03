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
    this.removeFileIfVersionNotExists = pack.removeFileIfVersionNotExists;
    this.files = pack.files.map(file => new File(file));
  }

  /**
   * Create new version of pack
   * @param {String} version
   */
  createVersion(version) {
    const index = this.versions.findIndex(item => item === version);
    if (index !== -1) {
      this.versions[index] = version;
    } else {
      this.versions.push(version);
    }
  }

  /**
   * Removes pack version and all files of this version
   * @param {String} version
   */
  removeVersion(version) {
    const index = this.versions.findIndex(item => item === version);
    if (index !== -1) {
      this.versions.splice(index, 1);
      this.files.each(file => file.removeVersion(version));
    }
  }

  /**
   * Create new file
   * @param {String} filename
   */
  async createFile(filename) {
    const data = await utils.prompt.file.create(filename);
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
   */
  async createFileVersion(filename, version) {
    const file = utils.find.file(this.files, filename);
    const data = await utils.prompt.file.createVersion(version);

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
    await Promise.map(this.file, file => file.setVersion(version));
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
      removeFileIfVersionNotExists: this.removeFileIfVersionNotExists,
      files: this.files.map(file => file.getData()),
    };
  }
}

module.exports = Pack;
