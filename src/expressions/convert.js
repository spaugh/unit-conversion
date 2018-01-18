require('./utils').setPrecision();

const parse = require('./parse');
const evaluate = require('./evaluate');

const { ApprovedUnit } = require('./units');
const { OperatorToken, UnitToken } = require('./tokens');

/**
 * _convertTokenToSI
 *
 * @param {Token} token
 * @returns {Token[]}
 */
function _convertTokenToSI(token) {
  const newTokens = [];
  token.value.baseUnits.forEach(unit => {
    newTokens.push(new UnitToken(unit.symbol));
    newTokens.push(new OperatorToken('*'));
  });
  return newTokens.slice(0, -1);
}

/**
 * convertToSI
 *
 * @param {String} expression - Mathematical expression, e.g. (2*3)/4
 * @return {{expression: String, conversionFactor: Decimal}}
 */
function convertToSI(expression) {
  const tokens = parse(expression);
  const conversionFactor = evaluate(tokens);
  expression = tokens.map(token => {
    if (token.value instanceof ApprovedUnit) {
      return _convertTokenToSI(token);
    } else {
      return token;
    }
  }).reduce((all, token) => all.concat(Array.isArray(token) ? token : [token]), []).join('');
  return { expression, conversionFactor };
}

module.exports = { convertToSI };
