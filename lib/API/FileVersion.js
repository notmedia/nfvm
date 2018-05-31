const sha = require('sha');

class FileVersion {
  /**
   * Constructor
   * @param {Object} version
   */
  constructor(version) {
    this.name = version.name;
    this.path = version.path;
    this.hash = version.hash;
  }

  checkHashes() {

  }

  getHashes() {

  }

  /**
   * Returns data for config
   */
  getData() {
    return {
      name: this.name,
      path: this.path,
      hash: this.hash,
    };
  }
}

module.exports = FileVersion;
