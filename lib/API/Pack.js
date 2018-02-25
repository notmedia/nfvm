const File = require('./File');

class Pack {
  constructor(pack) {
    this.name = pack.name;
    this.defaultVersion = pack.defaultVersion;
    this.currentVersion = pack.currentVersion;
    this.removeFileIfVersionNotExists = pack.removeFileIfVersionNotExists;
    this.files = pack.files.map(file => new File(file));
  }
}

module.exports = Pack;
