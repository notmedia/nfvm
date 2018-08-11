const chalk = require('chalk');
const Table = require('cli-table-redemption');

const headerColor = '#F6670E';

/**
 * Draw table of packs
 * @param {Object[]} packs
 */
const packsList = (packs = []) => {
  const table = new Table({
    head: [
      chalk.hex(headerColor).bold('ID'),
      chalk.hex(headerColor).bold('Pack'),
      chalk.hex(headerColor).bold('Default Version'),
      chalk.hex(headerColor).bold('Current Version'),
      chalk.hex(headerColor).bold('Files'),
    ],
    colAligns: ['middle', 'left', 'left', 'left', 'middle'],
  });

  packs.forEach((pack, index) => {
    table.push([
      ++index,
      pack.name,
      pack.defaultVersion,
      pack.currentVersion,
      pack.files.length,
    ]);
  });

  return table;
};

/**
 * Draw table of files
 * @param {Object[]} files
 */
const filesList = (files = []) => {
  const table = new Table({
    head: [
      chalk.hex(headerColor).bold('ID'),
      chalk.hex(headerColor).bold('File'),
      chalk.hex(headerColor).bold('Destination Path'),
      chalk.hex(headerColor).bold('Symlink'),
      chalk.hex(headerColor).bold('RFIVNE'),
    ],
    colAligns: ['middle', 'left', 'left', 'middle', 'middle'],
  });

  files.forEach((file, index) => {
    table.push([
      ++index,
      file.filename,
      file.destinationPath,
      file.symlink ? chalk.green.bold('on') : chalk.red.bold('off'),
      file.removeFileIfVersionNotExists ? chalk.green.bold('on') : chalk.red.bold('off'),
    ]);
  });

  return table;
};

/**
 * Draw pack info
 * @param {Object} pack
 */
const packInfo = (pack) => {
  console.log(`${chalk.cyan.bold(' Pack: ')} ${pack.name}`);
  console.log(`${chalk.cyan.bold(' Current Version: ')} ${pack.currentVersion}`);
  console.log(`${chalk.cyan.bold(' Available versions : ')} ${pack.versions}`);
  const table = filesList(pack.files);
  console.log(table.toString());
};

module.exports = {
  packsList,
  packInfo,
  filesList,
};
