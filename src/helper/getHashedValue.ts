module.exports = function getHashedValue(hashedMap, key) {
  return hashedMap.get(key.toString());
};
