const { unitDefinitions } = require('./definitions');
const { tokenize, evaluateTokenizedExpression } = require('./expressions');

const isOperator = (string) => ['*', '/', '(', ')'].includes(string);

function convertExpressionToSI(expression) {
  let tokens = tokenize(expression);
  let conversionFactor = evaluateTokenizedExpression(tokens).toPrecision(14);
  let newExpression = tokens.map(token => token.asString()).join('');
  return { conversionFactor, expression: newExpression }
}

module.exports.convertExpressionToSI = convertExpressionToSI;
