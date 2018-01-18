const Decimal = require('decimal.js');
const { PrecisionError } = require('./errors');

const PRECISION_BUFFER = 5;

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
  let precision = parseInt(process.env.PRECISION, 10);
  precision = isNaN(precision) ? Decimal.precision : precision + PRECISION_BUFFER;
  if (precision <= 1000) {
    Decimal.set({ precision });
  } else {
    throw new PrecisionError('Precision limited to 1000 sigfigs due to precision of Pi');
  }
}

module.exports = { buildMap, setPrecision };
