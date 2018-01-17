const { unitDefinitions } = require('./definitions');
const { tokenize, evaluateExpression } = require('./expressions');

function convertExpressionToSI(expression) {
  let tokens = tokenize(expression).map(token => {
    if (['/','*','(',')'].includes(token)) {
      return token;
    } else {
      // TODO: Add error checking
      return unitDefinitions.get(token);
    }
  });
  let conversionFactor = evaluateExpression(tokens.map(token => {
    return (typeof token === 'string') ? token : token.conversionFactor;
  }));

  // TODO: Add ability to replace with multiple base units
  let newExpression = tokens.map(token => {
    return (typeof token === 'string') ? token : token.baseUnits[0].symbol;
  }).join('');

  return { conversionFactor, expression: newExpression }
}

console.log(convertExpressionToSI('((hectares*minutes)/((seconds*hours))'));

module.exports.convertExpressionToSI = convertExpressionToSI;
