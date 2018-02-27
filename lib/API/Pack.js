const File = require('./File');

class Pack {
  /**
   * Constructor
   * @param {Object} pack
   */
  constructor(pack) {
    this.name = pack.name;
    this.defaultVersion = pack.defaultVersion;
    this.currentVersion = pack.currentVersion;
    this.versions = pack.versions;
    this.removeFileIfVersionNotExists = pack.removeFileIfVersionNotExists;
    this.files = pack.files.map(file => new File(file));
  }

  /**
   * Create new version of pack
   * @param {Object} version
   */
  createVersion(version) {
  }

  /**
   * Returns data for config
   */
  getData() {
    return {
      name: this.name,
      defaultVersion: this.defaultVersion,
      currentVersion: this.currentVersion,
      removeFileIfVersionNotExists: this.removeFileIfVersionNotExists,
      files: this.files.map(file => file.getData()),
    };
  }
}

module.exports = Pack;
