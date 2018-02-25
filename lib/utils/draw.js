const chalk = require('chalk');
const Table = require('cli-table-redemption');

/**
 * Draw table of packs
 * @param {Object[]} packs
 */
module.exports.packsList = (packs = []) => {
  const table = new Table({
    head: [
      chalk.hex('#F6670E').bold('ID'),
      chalk.hex('#F6670E').bold('Pack'),
      chalk.hex('#F6670E').bold('Default Version'),
      chalk.hex('#F6670E').bold('Version'),
      chalk.hex('#F6670E').bold('Files'),
      chalk.hex('#F6670E').bold('RFIVNE'),
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
      chalk.hex('#F6670E').bold('ID'),
      chalk.hex('#F6670E').bold('File'),
      chalk.hex('#F6670E').bold('Destination Path'),
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
