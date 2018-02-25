/**
 * Find pack by name
 * @param {Object[]} packs
 * @param {String} name - pack name
 */
module.exports.pack = (packs = [], name) => {
  const pack = packs.find(item => item.name === name);
  if (!pack) {
    throw new Error(`Pack ${name} does not exists!`)
  }

  return pack;
};
