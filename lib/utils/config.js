const fs = require('fs');
const path = require('path');

/**
 * Return path to config file
 */
const getConfigPath = () => {
  if (process.env.HOME && !process.env.HOMEPATH) {
    return path.resolve(process.env.HOME, '.nfvm');
  } else if (process.env.HOME || process.env.HOMEPATH) {
    return path.resolve(process.env.HOMEDRIVE, process.env.HOME || process.env.HOMEPATH, '.nfvm');
  }

  return path.resolve('/etc', '.nfvm');
};

module.exports = () => {
  const NFVM_PATH = getConfigPath();
  const NFVM_CONFIG_FILE_PATH = path.resolve(NFVM_PATH, 'nfvm_config.json');

  // Create nfvm app folder
  if (!fs.existsSync(NFVM_PATH)) {
    fs.mkdirSync(NFVM_PATH);
  }

  // Create config file
  if (!fs.existsSync(NFVM_CONFIG_FILE_PATH)) {
    // fs.mkdirSync(NFVM_PATH);
    fs.writeFileSync(NFVM_CONFIG_FILE_PATH, '{}');
  }

  return NFVM_CONFIG_FILE_PATH;
};
