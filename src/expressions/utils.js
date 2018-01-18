const Decimal = require('decimal.js');
const { PrecisionError } = require('./errors');

function buildMap(list, keyFn) {
  const newMap = new Map();
  for (const item of list) {
    const key = keyFn(item);
    if (Array.isArray(key)) {
      key.map(k => newMap.set(k, item));
    } else {
      newMap.set(key, item);
    }
  }
  return newMap;
}

function setPrecision() {
  const precision = parseInt(process.env.PRECISION || Decimal.precision);
  if (precision <= 1000) {
    Decimal.set({ precision });
  } else {
    throw new PrecisionError('Precision limited to 1000 sigfigs due to precision of Pi');
  }
}

module.exports = { buildMap, setPrecision };
