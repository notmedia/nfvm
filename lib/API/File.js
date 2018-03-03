const fs = require('fs-extra');
const chalk = require('chalk');

class File {
  /**
   * Constructor
   * @param {Object} file
   */
  constructor(file) {
    this.filename = file.filename;
    this.destinationPath = file.destinationPath;
    this.versions = file.versions || [];
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

  /**
   * Set file version
   * @param {String} version
   */
  async setVersion(version) {
    const index = this.versions.findIndex(item => item.name === version);
    if (index !== -1) {
      try {
        await fs.copy(this.destinationPath, this.versions[index].sourcePath);
      } catch (err) {
        console.log(chalk.red(err));
      }
    }
  }

  /**
   * Returns data for config
   */
  getData() {
    return {
      filename: this.filename,
      destinationPath: this.destinationPath,
      versions: this.versions,
    };
  }
}

module.exports = File;
