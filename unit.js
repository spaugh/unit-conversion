WORD_REGEX = /[a-zA-Z]+[^s]/;

class Unit {
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
  asString() {
    return this.symbol;
  }
}

class BaseUnit extends Unit {}

class ApprovedUnit extends Unit {
  constructor(name, symbol, quantity, conversionFactor, baseUnits, alternativeSpellings = []) {
    super(name, symbol, quantity, alternativeSpellings);
    this.baseUnits = baseUnits;
    this.conversionFactor = conversionFactor;
  }
  asBaseUnitString() {
    return this.baseUnits.map(b => b.asString()).join('*');
  }
}

module.exports = { BaseUnit, ApprovedUnit }
