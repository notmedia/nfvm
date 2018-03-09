const chalk = require('chalk');
const Table = require('cli-table-redemption');

const headerColor = '#F6670E';

/**
 * Draw table of packs
 * @param {Object[]} packs
 */
module.exports.packsList = (packs = []) => {
  const table = new Table({
    head: [
      chalk.hex().bold('ID'),
      chalk.hex(headerColor).bold('Pack'),
      chalk.hex(headerColor).bold('Default Version'),
      chalk.hex(headerColor).bold('Version'),
      chalk.hex(headerColor).bold('Files'),
      chalk.hex(headerColor).bold('RFIVNE'),
    ],
    colAligns: ['middle', 'left', 'left', 'left', 'middle', 'middle'],
  });

  packs.forEach((pack, index) => {
    table.push([
      ++index,
      pack.name,
      pack.defaultVersion,
      pack.currentVersion,
      pack.files.length,
      pack.removeFileIfVersionNotExists ? chalk.green.bold('on') : chalk.red.bold('off'),
    ]);
  });

  return table;
};

/**
 * Draw table of files
 * @param {Object[]} files
 */
module.exports.filesList = (files = []) => {
  const table = new Table({
    head: [
      chalk.hex(headerColor).bold('ID'),
      chalk.hex(headerColor).bold('File'),
      chalk.hex(headerColor).bold('Destination Path'),
    ],
    colAligns: ['middle', 'left', 'left'],
  });

  files.forEach((file, index) => {
    table.push([
      ++index,
      file.filename,
      file.destinationPath,
    ]);
  });

  return table;
};
