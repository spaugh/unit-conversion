const Decimal = require('decimal.js');

const { unitDefinitions } = require('./definitions');

class Token {
  constructor(string) {
    if (this.constructor === Token) {
      throw new Error('Token is an abstract base class, not to be instantiated!');
    }
    this.value = string;
  }
  asString() {
    return this.value;
  }
}

class OperatorToken extends Token {
  constructor(string) {
    super(string);
    const { precedence, associativity, execute } = OperatorToken.types[string];
    if (precedence === undefined) {
      throw new Error(`Unknown operator ${string}!`);
    }
    this.precedence = precedence;
    this.associativity = associativity;
    this._execute = execute;
  }
  asNumber() {
    throw new Error('Operator has no conversion to number!');
  }
  execute(left, right) {
    return this._execute(left.asNumber(), right.asNumber());
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

class LeftBracketToken extends Token {}

class RightBracketToken extends Token {}

class UnitToken extends Token {
  constructor(string) {
    super(string);
    this.value = unitDefinitions.get(string);
    if (this.value === undefined) {
      throw new Error(`Unknown unit type ${string}`);
    }
  }
  asNumber() {
    return this.value.conversionFactor;
  }
  asString() {
    return this.value.asBaseUnitString();
  }
}

class NumberToken extends Token {
  constructor(string) {
    super(string);
    this.value = new Decimal(string);
  }
  asNumber() {
    return this.value;
  }
  asString() {
    return this.value.toString();
  }
}

module.exports = { LeftBracketToken, RightBracketToken, OperatorToken, UnitToken, NumberToken }
