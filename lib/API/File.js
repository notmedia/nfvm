const fs = require('fs-extra');
const path = require('path');

const FileVersion = require('./FileVersion');

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
    this.versions = file.versions.map(version => new FileVersion(version));
  }

  /**
   * Create file version
   * @param {Object} version
   */
  createVersion(version) {
    // TODO: new FileVersion? generate hashes.
    this.versions.push(version);
  }

  /**
   * Remove file version
   * @param {String} version
   */
  removeVersion(version) {
    const index = this.versions.findIndex(item => item.name === version);
    if (index !== -1) {
      this.versions.splice(index, 1);
    }
  }

  /**
   * Set file version
   * @param {String} version
   */
  async setVersion(version) {
    const index = this.versions.findIndex(item => item.name === version);

    // TODO: check versions hashes
    if (index !== -1) {
      if (this.symlink) {
        await fs.remove(path.join(this.destinationPath, this.filename));
        await fs.ensureSymlink(this.versions[index].path,
          path.join(this.destinationPath, this.filename));
      } else {
        await fs.copy(this.versions[index].path,
          path.join(this.destinationPath, this.filename));
      }
    } else if (this.removeFileIfVersionNotExists) {
      await fs.remove(path.join(this.destinationPath, this.filename));
    } else {
      throw new Error('File version does not exist.');
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
      versions: this.versions.map(version => version.getData()),
    };
  }
}

module.exports = File;
