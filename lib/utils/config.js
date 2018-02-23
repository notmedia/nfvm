const fs = require('fs');
const path = require('path');
const jsonfile = require('jsonfile');

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
 * Returns config
 */
module.exports.get = () => {
  const NFVM_PATH = getAppDataPath();
  const NFVM_CONFIG_FILE_PATH = path.resolve(NFVM_PATH, '.nfvmrc.json');

  // Create nfvm app folder
  if (!fs.existsSync(NFVM_PATH)) {
    fs.mkdirSync(NFVM_PATH);
  }

  // Create config file
  if (!fs.existsSync(NFVM_CONFIG_FILE_PATH)) {
    // TODO: write default config
    jsonfile.writeFileSync(NFVM_CONFIG_FILE_PATH, {});

    return {};
  }

  return jsonfile.readFileSync(NFVM_CONFIG_FILE_PATH);
};

/**
 * Creates config file in PWD folder.
 * @param {Object} config - config to save
 */
module.exports.create = (config) => {
  const NFVM_CONFIG_FILE_PATH = path.resolve(process.env.PWD, '.nfvmrc.json');

  // Create config file
  if (!fs.existsSync(NFVM_CONFIG_FILE_PATH)) {
    jsonfile.writeFileSync(NFVM_CONFIG_FILE_PATH, config);
  }
};
