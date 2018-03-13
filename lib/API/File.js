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
   * @param {Boolean=} rfivne - remove file if version not exists
   */
  async setVersion(version, rfivne = false) {
    const index = this.versions.findIndex(item => item.name === version);
		try {
      if (index !== -1) {
        await fs.copy(this.versions[index].sourcePath, this.destinationPath);
      } else if (rfivne) {
        await fs.remove(this.destinationPath);
      }
    } catch (err) {
      console.log(chalk.red(err));
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
