const File = require('./File');

/**
 * Creates or updates given version pack in
 * the pack versions list
 * @private
 * @param {String} version
 */
function createOrUpdateVersion(version) {
  console.log(this);
  const index = this.versions.findIndex(item => item === version);
  if (index !== -1) {
    this.versions[index] = version;
  } else {
    this.versions.push(version);
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
      throw new Error(`Pack version ${version} already exists.`);
    }

    createOrUpdateVersion.call(this, version);
  }

  createFile(file) {
  }

  createFileVersion(version) {
  }

  setVersion(version) {
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
