const File = require('./File');

class Pack {
  constructor(name, files = []) {
    this.name = name;
    this.files = files.map(file => new File(file));
  }
}

module.exports = Pack;
