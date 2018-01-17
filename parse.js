const TOKEN_REGEX = /\(|\)|\*|\/|[^\(\)\*\/\s]+/g

// Based on https://en.wikipedia.org/wiki/Shunting-yard_algorithm
// Limited to equal precedence operators (i.e., * and /)
function convertToPostfix(expression) {
  let match;
  let output = [];
  let operatorStack = [];
  while ((match = TOKEN_REGEX.exec(expression)) !== null) {
    let token = match[0].trim();
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

console.log(convertToPostfix('(degree/(minute*hectare*second))'));
