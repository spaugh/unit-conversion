const TOKEN_REGEX = /\(|\)|\*|\/|[^\(\)\*\/\s]+/g

module.exports.tokenize = (expression) => {
  let match;
  let tokens = [];
  while ((match = TOKEN_REGEX.exec(expression)) !== null) {
    tokens.push(match[0]); 
  }
  return tokens;
}

module.exports.evaluateTokenizedExpression = (tokens) => {
  return evaluatePostfix(convertToPostfix(tokens));
}

// Based on https://en.wikipedia.org/wiki/Shunting-yard_algorithm
// Limited to equal precedence operators (i.e., * and /)
function convertToPostfix(infixTokens) {
  let output = [];
  let operatorStack = [];
  for (let token of infixTokens) {
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
function evaluatePostfix(tokens) {
  let stack = [];
  let temp;
  for (let token of tokens) {
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


//console.log(evaluatePostfix(24, 3, 4, '*', '/'));
//console.log(convertToPostfix('(degree/(minute*hectare*second))'));
