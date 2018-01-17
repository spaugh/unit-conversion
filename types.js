WORD_REGEX = /[a-zA-Z]+[^s]/;

class BaseUnit {
  constructor(name, symbol, quantity, alternativeSpellings = []) {
    this.name = name;
    this.quantity = quantity;
    this.symbol = symbol;

    this.spellings = new Set();
    for (let spelling of alternativeSpellings.concat([ name, symbol ])) {
      if (WORD_REGEX.test(spelling)) {
        this.spellings.add(spelling + 's');
      }
      this.spellings.add(spelling);
    }
  }
  toThe(exponent) {
    return Object.assign({ exponent }, this);
  }
}

class ApprovedUnit {
  constructor(name, symbol, quantity, conversionFactor, baseUnits, alternativeSpellings = []) {
    this.name = name;
    this.symbol = symbol;
    this.quantity = quantity;
    this.baseUnits = baseUnits;
    this.conversionFactor = conversionFactor;
    
    this.spellings = new Set();
    for (let spelling of alternativeSpellings.concat([ name, symbol ])) {
      if (WORD_REGEX.test(spelling)) {
        this.spellings.add(spelling + 's');
      }
      this.spellings.add(spelling);
    }
  }
}

class UnknownQuantity {
  constructor(string) {
    this.string = string;
  }
  convertToSI() {
    let tokens = tokenize(this.string);
    tokens = tokens.map(token => {
      // TODO: Improve the runtime complexity of this find
      switch (token) {
        case '/':
        case '*':
        case '(':
        case ')':
          return token;
        default:
          for (let unit of APPROVED_UNITS.values()) {
            if (unit.spellings.has(token.trim())) {
              return unit;
            }
          }
      }
    });
    console.log(tokens);
    console.log('conversion factor tokens');
    console.log(tokens.map(t => typeof t === 'string' ? t : t.conversionFactor));
    let postfix = convertToPostfix(tokens.map(t => typeof t === 'string' ? t : t.conversionFactor)); 
    console.log(postfix)
    let conversionFactor = evaluatePostfix(...postfix);
    let newExpression = tokens.map(t => typeof t === 'string' ? t : t.baseUnits[0].symbol).join(''); 
    return { conversionFactor, newExpression }
  }

}

module.exports.BaseUnit = BaseUnit;
module.exports.ApprovedUnit = ApprovedUnit;
