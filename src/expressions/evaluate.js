require('./utils').setPrecision();

const TokenTypes = require('./tokens');
const { UnbalancedParentheses, InvalidExpression } = require('./errors');

function evaluate(tokenizedInfixExpression) {
  const postfix = _convertToPostfix(tokenizedInfixExpression);
  return _evaluatePostfix(postfix);
}

const _stackContainsValidOperators = (stack) => {
  return stack.length && !(stack[stack.length - 1] instanceof TokenTypes.LeftBracketToken);
}

// Based on https://en.wikipedia.org/wiki/Shunting-yard_algorithm
// Limited to equal precedence operators (i.e., * and /)
function _convertToPostfix(tokenizedInfixExpression) {
  let output = [];
  let operatorStack = [];
  for (let token of tokenizedInfixExpression) {
    if (token instanceof TokenTypes.LeftBracketToken) {
      operatorStack.push(token);
    } else if (token instanceof TokenTypes.RightBracketToken) {
      while (_stackContainsValidOperators(operatorStack)) {
        output.push(operatorStack.pop());
      }
      let removed = operatorStack.pop();
      if (!(removed instanceof TokenTypes.LeftBracketToken)) {
        throw new UnbalancedParentheses();
      }
    } else if (token instanceof TokenTypes.OperatorToken) {
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
    if (operator instanceof TokenTypes.LeftBracketToken || operator instanceof TokenTypes.RightBracketToken) {
      throw new UnbalancedParentheses();
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
    if (token instanceof TokenTypes.OperatorToken) {
      temp = stack.pop();
      stack.push(new TokenTypes.NumberToken(token.execute(stack.pop(), temp)));
    } else {
      stack.push(token);
    }
  }
  if (stack.length !== 1) {
    throw new InvalidExpression();
  }
  return stack[0].value;
}

module.exports = evaluate;
