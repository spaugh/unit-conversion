const { unitDefinitions } = require('./definitions');
const { tokenize, evaluateExpression } = require('./expressions');

const isOperator = (string) => ['*', '/', '(', ')'].includes(string);

function convertExpressionToSI(expression) {
  let tokens = tokenize(expression);
  
  let conversionFactor = evaluateExpression(tokens.map(token => {
    return isOperator(token) ? token : unitDefinitions.get(token).conversionFactor;
  }));

  // TODO: Add ability to replace with multiple base units
  let newExpression = tokens.map(token => {
    return isOperator(token) ? token : unitDefinitions.get(token).asBaseUnitString();
  }).join('');

  return { conversionFactor, expression: newExpression }
}

console.log(convertExpressionToSI('((hectares*minutes)/((seconds*hours))'));

module.exports.convertExpressionToSI = convertExpressionToSI;
