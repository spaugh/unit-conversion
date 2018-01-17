const TOKEN_REGEX = /\(|\)|\*|\/|[^\(\)\*\/\s]+/g

function tokenize(expression) {
  let match;
  let tokens = [];
  while ((match = TOKEN_REGEX.exec(expression)) !== null) {
    tokens.push(match[0]); 
  }
  return tokens;
}

function evaluateExpression(expression) {
  const tokens = Array.isArray(expression) ? expression : tokenize(expression);
  const postfix = _convertToPostfix(tokens);
  return _evaluatePostfix(postfix);
}

// Based on https://en.wikipedia.org/wiki/Shunting-yard_algorithm
// Limited to equal precedence operators (i.e., * and /)
function _convertToPostfix(tokenizedInfixExpression) {
  let output = [];
  let operatorStack = [];
  for (let token of tokenizedInfixExpression) {
    switch (token) {
      case '(':
        operatorStack.push(token);
        break;
      case ')':
        // TODO: Catch unbalanced parens
        while (operatorStack.length && operatorStack[operatorStack.length - 1] != '(') {
          output.push(operatorStack.pop());
        }
        operatorStack.pop();
        break;
      case '/':
      case '*':
        while (operatorStack.length && operatorStack[operatorStack.length - 1] != '(') {
          output.push(operatorStack.pop());
        }
        operatorStack.push(token);
        break;
      default: // If it's a number or unit
        output.push(token); 
        break;
    }
  }
  while (operatorStack.length) {
    output.push(operatorStack.pop());
  }
  return output;
}

// Limited to * and / operators
function _evaluatePostfix(tokenizedPostfixExpression) {
  let stack = [];
  let temp;
  for (let token of tokenizedPostfixExpression) {
    switch (token) {
      case '*':
        temp = stack.pop();
        stack.push(stack.pop() * temp);
        break;
      case '/':
        temp = stack.pop();
        stack.push(stack.pop() / temp);
        break;
      default:
        stack.push(token);
        break;
    }
  }
  return stack[0];
}

module.exports.tokenize = tokenize;
module.exports.evaluateExpression = evaluateExpression;
