const promptly = require('promptly');
const chalk = require('chalk')

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
  async initialize() {
    // TODO: catch Ctrl^C
    const name = await promptly.prompt(chalk.green('Pack name:'));
    const defaultVersion = await promptly.prompt(chalk.green('Default version: (default)'), {
      default: 'default',
    });
    const removeFileIfVersionNotExists = await promptly.confirm(chalk.green('Remove file if version not exists? (y/n)'));

    this.config = config.create({
      packs: [{
        name,
        defaultVersion,
        removeFileIfVersionNotExists,
        files: [],
      }],
    });
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
