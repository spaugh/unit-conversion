const { LeftBracketToken, RightBracketToken, OperatorToken, UnitToken, NumberToken } = require('./token');

// No named RegExp capture groups in JavaScript...*sigh*
const TOKEN_REGEX = /(\()|(\))|(\*)|(\/)|(\+)|(-)|(\^)|(\d+(?:\.\d+)?)|([^\(\)\*\/\s]+)/g

function tokenize(expression) {
  TOKEN_REGEX.lastIndex = 0; // Reset state of regex so that we don't have to reinstantiate
  let tokens = [];
  let match;
  while ((match = TOKEN_REGEX.exec(expression)) !== null) {
    let index = match.slice(1).findIndex((el) => !!el);
    if (index === 0) {
      tokens.push(new LeftBracketToken(match[index + 1]));
    } else if (index === 1) {
      tokens.push(new RightBracketToken(match[index + 1]));
    } else if (index <= 3) {
      tokens.push(new OperatorToken(match[index + 1]));
    } else if (index <= 6) {
      throw new Error(`"${match[index + 1]}" operator not supported!`);
    } else if (index === 7) {
      tokens.push(new NumberToken(match[index + 1]));
    } else {
      tokens.push(new UnitToken(match[index + 1]));
    }
  }
  return tokens;
}

function evaluateTokenizedExpression(tokenizedInfixExpression) {
  const postfix = _convertToPostfix(tokenizedInfixExpression);
  return _evaluatePostfix(postfix);
}

const _stackContainsValidOperators = (stack) => {
  return stack.length && !(stack[stack.length - 1] instanceof LeftBracketToken);
}

// Based on https://en.wikipedia.org/wiki/Shunting-yard_algorithm
// Limited to equal precedence operators (i.e., * and /)
function _convertToPostfix(tokenizedInfixExpression) {
  let output = [];
  let operatorStack = [];
  for (let token of tokenizedInfixExpression) {
    if (token instanceof LeftBracketToken) {
      operatorStack.push(token);
    } else if (token instanceof RightBracketToken) {
      while (_stackContainsValidOperators(operatorStack)) {
        output.push(operatorStack.pop());
      }
      let removed = operatorStack.pop();
      if (!(removed instanceof LeftBracketToken)) {
        throw new Error('Unbalanced parentheses!');
      }
    } else if (token instanceof OperatorToken) {
      while (_stackContainsValidOperators(operatorStack)) {
        output.push(operatorStack.pop());
      }
      operatorStack.push(token);
    } else {
      output.push(token);
    }
  }
  while (operatorStack.length) {
    let operator = operatorStack.pop();
    if (operator instanceof LeftBracketToken || operator instanceof RightBracketToken) {
      throw new Error('Unbalanced parentheses!');
    }
    output.push(operator);
  }
  return output;
}

// Limited to * and / operators
function _evaluatePostfix(tokenizedPostfixExpression) {
  let stack = [];
  let temp;
  for (let token of tokenizedPostfixExpression) {
    if (token instanceof OperatorToken) {
      temp = stack.pop();
      stack.push(new NumberToken(token.execute(stack.pop(), temp)));
    } else {
      stack.push(token);
    }
  }
  return stack[0].value;
}

module.exports.tokenize = tokenize;
module.exports.evaluateTokenizedExpression = evaluateTokenizedExpression;
