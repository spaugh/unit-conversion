var ExtendableError = require('es6-error');

class PrecisionError extends ExtendableError {
  constructor(message = 'Precision error!') {
    super(message);
    this.internal = true;
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

class UnsupportedExpression extends ExtendableError {
  constructor(expression) {
    super(`Unsupported expression "${expression}"!`);
    this.expression = expression;
  }
}

class UnsupportedOperator extends ExtendableError {
  constructor(operator) {
    super(`Unsupported operator "${operator}"!`);
    this.operator = operator;
  }
}

class UnsupportedUnit extends ExtendableError {
  constructor(unit) {
    super(`Unsupported unit "${unit}"!`);
    this.operator = unit;
  }
}

module.exports = {
  ExtendableError,
  PrecisionError,
  InvalidExpression,
  UnbalancedParentheses,
  UnsupportedExpression,
  UnsupportedOperator,
  UnsupportedUnit,
}
