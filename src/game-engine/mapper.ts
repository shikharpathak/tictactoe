const hashedMap = new Map();

hashedMap.set("1", 11);
hashedMap.set("2", 13);
hashedMap.set("3", 17);
hashedMap.set("4", 19);
hashedMap.set("5", 23);
hashedMap.set("6", 29);
hashedMap.set("7", 31);
hashedMap.set("8", 37);
hashedMap.set("9", 41);

function getHashedValue(key) {
  return hashedMap.get(key.toString());
}

module.exports = getHashedValue;
