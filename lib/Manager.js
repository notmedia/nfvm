const config = require('./utils/config');

class Manager {
  /**
   * Constructor
   * @param {Boolean} cli - true if starts in cli mode.
   */
  constructor(cli = false) {
    this.cli = cli;
    this.config = config.get();
  }

  /**
   * Initialize config
   */
  init() {
    this.config = config.create({});
  }

  /**
   * Creates new pack of files or new version of pack
   * @param {String} packName
   * @param {String} version
   */
  create(packName, version = null) {
  }

  /**
   * Removes pack or pack version
   * @param {String} packName
   * @param {String} version
   */
  remove(packName, version = null) {
  }

  /**
   * Sets the given version of pack
   * @param {String} packName
   * @param {String} version
   */
  set(packName, version = 'default') {
  }
}

module.exports = Manager;
