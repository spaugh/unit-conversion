module.exports.buildMap = (list, keyFn) => {
  let newMap = new Map();
  for (let item of list) {
    let key = keyFn(item);
    if (Array.isArray(key)) {
      key.map(k => newMap.set(k, item));
    } else {
      newMap.set(key, item);
    }
  }
  return newMap;
}
