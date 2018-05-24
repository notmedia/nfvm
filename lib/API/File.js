const fs = require('fs-extra');
const path = require('path');

class File {
  /**
   * Constructor
   * @param {Object} file
   */
  constructor(file) {
    this.filename = file.filename;
    this.destinationPath = file.destinationPath;
    this.removeFileIfVersionNotExists = file.removeFileIfVersionNotExists;
    this.symlink = file.symlink;
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
    const index = this.versions.findIndex(item => item.versionName === version);

    if (index !== -1) {
      if (this.symlink) {
        await fs.remove(path.join(this.destinationPath, this.filename));
        await fs.ensureSymlink(this.versions[index].sourcePath,
          path.join(this.destinationPath, this.filename));
      } else {
        await fs.copy(this.versions[index].sourcePath,
          path.join(this.destinationPath, this.filename));
      }
    } else if (this.removeFileIfVersionNotExists) {
      await fs.remove(path.join(this.destinationPath, this.filename));
    }
  }

  /**
   * Returns data for config
   */
  getData() {
    return {
      filename: this.filename,
      destinationPath: this.destinationPath,
      removeFileIfVersionNotExists: this.removeFileIfVersionNotExists,
      symlink: this.symlink,
      versions: this.versions,
    };
  }
}

module.exports = File;
