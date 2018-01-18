require('./utils').setPrecision();

const { OperatorToken } = require('./tokens');
const { UnbalancedParentheses, InvalidExpression } = require('./errors');

/**
 * evaluate
 *
 * @param {Token[]} tokenizedInfixExpression
 * @returns {Number}
 */
function evaluate(tokenizedInfixExpression) {
  const postfix = _convertToPostfix(tokenizedInfixExpression);
  return _evaluatePostfix(postfix);
}

/**
 * _convertToPostfix
 * Based on https://en.wikipedia.org/wiki/Shunting-yard_algorithm
 * Limited to equal precedence operators (i.e., * and /)
 *
 * @param {Token[]} tokens - Tokenized infix expression
 * @returns {Token{}} - Tokenized postfix expression
 */
function _convertToPostfix(tokens) {
  const output = [];
  const operators = [];
  tokens.forEach(token => {
    switch (token.value) {
    case '(':
      operators.push(token);
      break;
    case ')':
      while (_hasGroupedOperator(operators)) {
        output.push(operators.pop());
      }
      if (!operators.length || operators.pop().value !== '(') {
        throw new UnbalancedParentheses();
      }
      break;
    case '*':
    case '/':
      while (_hasGroupedOperator(operators)) {
        output.push(operators.pop());
      }
      operators.push(token);
      break;
    default:
      output.push(token);
      break;
    }
  });
  operators.forEach(op => {
    if (op.value == '(' || op.value == ')') {
      throw new UnbalancedParentheses();
    }
    output.push(op);
  });
  return output;
}

/**
 * _evaluatePostfix
 *
 * @param {Token[]} - Tokenized postfix expression
 * @returns {Number} - Value of evaluated expression
 */
function _evaluatePostfix(tokens) {
  const stack = [];
  tokens.forEach(token => {
    if (token instanceof OperatorToken) {
      stack.push(token.evaluateReverse(stack.pop(), stack.pop()));
    } else {
      stack.push(token);
    }
  });
  if (stack.length !== 1) {
    throw new InvalidExpression();
  }
  return stack[0].toNumber();
}

function _hasGroupedOperator(ops) {
  return (ops.length && ops[ops.length - 1].value !== '(');
}

module.exports = evaluate;
