const TokenTypes = require('./tokens');
const { UnsupportedOperator } = require('./errors');

// No named RegExp capture groups in JavaScript...*sigh*
const TOKEN_REGEX = /(\()|(\))|(\*)|(\/)|(\+)|(-)|(\^)|(\d+(?:\.\d+)?)|([^()*/+-^\s]+)/g;

/**
 * parse
 *
 * @param {String} expression - Mathematical expression with only *,/,(,) operators, e.g. (2*3/4)
 * @returns {Token[]} - Tokenized version of expression
 */
function parse(expression) {
  TOKEN_REGEX.lastIndex = 0; // Reset state of regex so that we don't have to reinstantiate
  const tokens = [];
  let match;
  while ((match = TOKEN_REGEX.exec(expression)) !== null) {
    const index = match.slice(1).findIndex((el) => !!el);
    if (index === 0) {
      tokens.push(new TokenTypes.LeftBracketToken(match[index + 1]));
    } else if (index === 1) {
      tokens.push(new TokenTypes.RightBracketToken(match[index + 1]));
    } else if (index <= 3) {
      tokens.push(new TokenTypes.OperatorToken(match[index + 1]));
    } else if (index <= 6) {
      throw new UnsupportedOperator(match[index + 1]);
    } else if (index === 7) {
      tokens.push(new TokenTypes.NumberToken(match[index + 1]));
    } else {
      tokens.push(new TokenTypes.UnitToken(match[index + 1]));
    }
  }
  return tokens;
}

module.exports = parse;
