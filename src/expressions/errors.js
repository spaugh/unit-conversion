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

class UnbalancedParentheses extends ExtendableError {
  constructor(message = 'Unbalanced Parentheses!') {
    super(message);
  }
}

class UnsupportedOperator extends ExtendableError {
  constructor(operator) {
    super(`Unsupported operator '${operator}'`);
    this.operator = operator;
  }
}

class UnsupportedUnit extends ExtendableError {
  constructor(unit) {
    super(`Unsupported unit '${unit}'`);
    this.operator = unit;
  }
}

module.exports = {
  ExtendableError,
  PrecisionError,
  InvalidExpression,
  UnbalancedParentheses,
  UnsupportedOperator,
  UnsupportedUnit,
};
