const fs = require('fs');
const path = require('path');
const jsonfile = require('jsonfile');
const chalk = require('chalk');

const defaults = require('../defaults');

/**
 * Return path to the AppData folder
 */
const getAppDataPath = () => {
  if (process.env.HOME && !process.env.HOMEPATH) {
    return path.resolve(process.env.HOME, '.nfvm');
  } else if (process.env.HOME || process.env.HOMEPATH) {
    return path.resolve(process.env.HOMEDRIVE, process.env.HOME || process.env.HOMEPATH, '.nfvm');
  }

  return path.resolve('/etc', '.nfvm');
};

/**
 * Saves config
 * @param {Object} config
 * @param {String} configFolder - full path to folder with .nfvmrc.json
 */
const save = (config, configFolder) => {
  const NFVM_CONFIG_FILE_PATH = path.resolve(configFolder, '.nfvmrc.json');

  try {
    jsonfile.writeFileSync(NFVM_CONFIG_FILE_PATH, config, {
      spaces: 2,
      EOL: '\r\n',
    });
  } catch (err) {
    console.log(chalk.red(err));
  }
};

/**
 * Returns global config
 */
module.exports.getGlobal = () => {
  const NFVM_PATH = getAppDataPath();
  const NFVM_CONFIG_FILE_PATH = path.resolve(NFVM_PATH, '.nfvmrc.json');

  // Create nfvm app folder if not exists
  if (!fs.existsSync(NFVM_PATH)) {
    fs.mkdirSync(NFVM_PATH);
  }

  // Create global config file if not exists
  if (!fs.existsSync(NFVM_CONFIG_FILE_PATH)) {
    save(defaults.config, NFVM_PATH);

    return defaults.config;
  }

  return jsonfile.readFileSync(NFVM_CONFIG_FILE_PATH);
};

/**
 * Returns local config if .nfvmrc.json exists
 */
module.exports.getLocal = () => {
  const NFVM_CONFIG_FILE_PATH = path.resolve(process.env.PWD, '.nfvmrc.json');

  return jsonfile.readFileSync(NFVM_CONFIG_FILE_PATH);
};

/**
 * Saves config file
 * @param {Object} config - config to save
 * @param {Boolean} global
 */
module.exports.save = (config, global = false) => {
  save(config, global ? getAppDataPath() : process.env.PWD);
};
