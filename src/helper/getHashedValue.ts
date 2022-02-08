module.exports = function getHashedValue(
  hashedMap: { get: (arg0: any) => any },
  key: { toString: () => any }
) {
  return hashedMap.get(key.toString());
};
