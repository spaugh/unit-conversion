const TokenTypes = require('./tokens');

// No named RegExp capture groups in JavaScript...*sigh*
const TOKEN_REGEX = /(\()|(\))|(\*)|(\/)|(\+)|(-)|(\^)|(\d+(?:\.\d+)?)|([^\(\)\*\/\s]+)/g

function parse(expression) {
  TOKEN_REGEX.lastIndex = 0; // Reset state of regex so that we don't have to reinstantiate
  let tokens = [];
  let match;
  while ((match = TOKEN_REGEX.exec(expression)) !== null) {
    let index = match.slice(1).findIndex((el) => !!el);
    if (index === 0) {
      tokens.push(new TokenTypes.LeftBracketToken(match[index + 1]));
    } else if (index === 1) {
      tokens.push(new TokenTypes.RightBracketToken(match[index + 1]));
    } else if (index <= 3) {
      tokens.push(new TokenTypes.OperatorToken(match[index + 1]));
    } else if (index <= 6) {
      throw new Error(`"${match[index + 1]}" operator not supported!`);
    } else if (index === 7) {
      tokens.push(new TokenTypes.NumberToken(match[index + 1]));
    } else {
      tokens.push(new TokenTypes.UnitToken(match[index + 1]));
    }
  }
  return tokens;
}

module.exports = parse; 
