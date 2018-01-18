var ExtendableError = require('es6-error');

class PrecisionError extends ExtendableError {
  constructor(message = 'Precision error!') {
    super(message);
  }
}

class InvalidExpression extends ExtendableError {
  constructor(message = 'Invalid Expression!') {
    super(message);
  }
}

class UnbalancedParentheses extends InvalidExpression {
  constructor(message = 'Unbalanced Parentheses!') {
    super(message);
  }
}

class UnsupportedExpression extends ExtendableError {
  constructor(expression) {
    super(`Unsupported expression "${expression}!`);
    this.expression = expression;
  }
}

class UnsupportedOperator extends UnsupportedExpression {
  constructor(operator) {
    super(`Unsupported operator "${operator}!`);
    this.operator = operator;
  }
}

class UnsupportedUnit extends UnsupportedExpression {
  constructor(unit) {
    super(`Unsupported unit "${unit}!`);
    this.operator = unit;
  }
}
