const Decimal = require('decimal.js');
const { PrecisionError } = require('./errors');

function buildMap(list, keyFn) {
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

function setPrecision() {
  let precision = parseInt(process.env.MAX_PRECISION || Decimal.precision);
  if (precision <= 1000) {
    Decimal.set({ precision });
  } else {
    throw new PrecisionError('Precision is limited to 1000 significant figures due to precision of Pi');
  }
}

module.exports = { buildMap, setPrecision };
