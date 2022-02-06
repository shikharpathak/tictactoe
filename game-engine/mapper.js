const hashMap = new Map();

hashMap.set("1", 11);
hashMap.set("2", 13);
hashMap.set("3", 17);
hashMap.set("4", 19);
hashMap.set("5", 23);
hashMap.set("6", 29);
hashMap.set("7", 31);
hashMap.set("8", 37);
hashMap.set("9", 41);

function getHash(key) {
  return hashMap.get(key.toString());
}

module.exports = getHash;
