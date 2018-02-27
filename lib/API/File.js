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
