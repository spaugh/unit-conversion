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

module.exports.BaseUnit = BaseUnit;
module.exports.ApprovedUnit = ApprovedUnit;
