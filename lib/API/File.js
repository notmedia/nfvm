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
