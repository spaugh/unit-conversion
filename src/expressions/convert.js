const parse = require('./parse');
const evaluate = require('./evaluate');

const { ApprovedUnit } = require('./units');
const { OperatorToken, UnitToken } = require('./tokens');

function _convertTokenToSI(token) {
  let newTokens = [];
  for (let unit of token.value.baseUnits) {
    if (newTokens.length) {
      newTokens.push(new OperatorToken('*'));
    }
    newTokens.push(new UnitToken(unit.symbol));
  }
  return newTokens;
}

function convertToSI(expression) {
  const tokens = parse(expression);
  const conversionFactor = evaluate(tokens); 
  expression = tokens.map(token => {
    if (token instanceof UnitToken && token.value instanceof ApprovedUnit) {
      return _convertTokenToSI(token);
    } else {
      return token;
    }
  }).reduce((all, token) => all.concat(Array.isArray(token) ? token : [token]), []).join('');
  return { expression, conversionFactor }
}

module.exports = { convertToSI }
