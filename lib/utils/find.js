/**
 * Find pack by name
 * @param {Object[]=} packs
 * @param {String} name - pack name
 */
module.exports.pack = (packs = [], name) => {
  const pack = packs.find(item => item.name === name);
  if (!pack) {
    throw new Error(`Pack ${name} does not exists.`);
  }

  return pack;
};

/**
 * Find file by name
 * @param {Object[]=} files
 * @param {String} name - file name
 */
module.exports.file = (files = [], name) => {
  const pack = files.find(item => item.filename === name);
  if (!pack) {
    throw new Error(`File ${name} does not exists.`);
  }

  return pack;
};
