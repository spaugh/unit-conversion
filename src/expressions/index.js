require('./utils').setPrecision();

const parse = require('./parse');
const evaluate = require('./evaluate');
const { convertToSI } = require('./convert');
const errors = require('./errors');

module.exports = { parse, evaluate, convertToSI, errors };
