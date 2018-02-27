/**
 * Find pack by name
 * @param {Object[]=} packs
 * @param {String} name - pack name
 */
module.exports.pack = (packs = [], name) => {
  const pack = packs.find(item => item.name === name);
  if (!pack) {
    throw new Error(`Pack ${name} does not exists!`);
  }

  return pack;
};

/**
 * Find pack version by name
 * @param {Object} pack
 * @param {String} name - pack version name
 */
module.exports.packVersion = (pack, name) => {
  const version = pack.versions.find(item => item === name);
  if (!version) {
    throw new Error(`Pack version ${name} does not exists!`);
  }

  return version;
};
