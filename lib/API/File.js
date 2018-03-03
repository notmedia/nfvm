class File {
  /**
   * Constructor
   * @param {Object} file
   */
  constructor(file) {
    this.filename = file.filename;
    this.destinitionPath = file.destinitionPath;
    this.versions = file.versions;
  }

  /**
   * Create file version
   * @param {Object} version
   */
  createVersion(version) {
    this.versions.push(version);
  }

  /**
   * Remove file version
   * @param {String} version
   */
  removeVersion(version) {
    const index = this.versions.findIndex(item => item.name === version);
    this.versions.splice(index, 1);
  }

  setVersion(version) {
  }

  /**
   * Returns data for config
   */
  getData() {
    return {
      filename: this.filename,
      destinitionPath: this.destinitionPath,
      versions: this.versions,
    };
  }
}

module.exports = File;
