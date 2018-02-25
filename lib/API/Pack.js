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
    this.removeFileIfVersionNotExists = pack.removeFileIfVersionNotExists;
    this.files = pack.files.map(file => new File(file));
  }

  /**
   * Create new version of pack
   * @param {String} version
   */
  createVersion(version) {
    
  }
}

module.exports = Pack;
