const getConfig = require('./utils/config');

class Manager {
  constructor() {
    this.config = getConfig();
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
