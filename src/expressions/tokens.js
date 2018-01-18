require('./utils').setPrecision();

const Decimal = require('decimal.js');

const { UnsupportedOperator, UnsupportedUnit } = require('./errors');
const { unitDefinitions } = require('./definitions');

class Token {
  constructor(string) {
    if (this.constructor === Token) {
      throw new Error('Token is an abstract base class, not to be instantiated!');
    }
    this.value = string;
  }
  toString() {
    return this.value;
  }
}

class OperatorToken extends Token {
  constructor(string) {
    super(string);
    const { precedence, associativity, execute } = OperatorToken.types[string];
    if (precedence === undefined) {
      throw new UnsupportedOperator(string);
    }
    this.precedence = precedence;
    this.associativity = associativity;
    this._execute = execute;
  }
  execute(left, right) {
    return this._execute(left.toNumber(), right.toNumber());
  }
}
// NOTE: These values of precedence only matter in relative terms.
// Any valid precedence table can be used. As the challenge only
// requires multiplication and division, precedence values are
// unused, but provided with the intention of making this codebase
// easily extensible.
OperatorToken.types = {
  '*': { precedence: 3, associativity: 'left', execute: (left, right) => left.times(right) },
  '/': { precedence: 3, associativity: 'left', execute: (left, right) => left.dividedBy(right) },
}

class LeftBracketToken extends Token {
  constructor() {
    super('(');
  }
} 
class RightBracketToken extends Token {
  constructor() {
    super(')');
  }
}

class UnitToken extends Token {
  constructor(string) {
    super(string);
    this.value = unitDefinitions.get(string);
    if (this.value === undefined) {
      throw new UnsupportedUnit(string);
    }
  }
  toNumber() {
    return this.value.conversionFactor;
  }
  toString() {
    return this.value.symbol;
  }
}

class NumberToken extends Token {
  constructor(string) {
    super(string);
    this.value = new Decimal(string);
  }
  toNumber() {
    return this.value;
  }
  toString() {
    return this.value.toString();
  }
}

module.exports = { LeftBracketToken, RightBracketToken, OperatorToken, UnitToken, NumberToken }
