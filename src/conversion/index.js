const { tokenize, evaluateTokenizedExpression } = require('../expressions');

const isOperator = (string) => ['*', '/', '(', ')'].includes(string);

function convertUnitExpressionToSI(expression, precision = 14) {
  let tokens = tokenize(expression);
  let conversionFactor = evaluateTokenizedExpression(tokens).toPrecision(precision);
  let newExpression = tokens.map(token => token.asString()).join('');
  return { conversionFactor, expression: newExpression }
}

module.exports = { convertUnitExpressionToSI };
