export default class SymbolTable {
  constructor() {
    this.symbols = {}
  }

  register(symbol, type, value) {
    this.symbols[symbol] = {symbol, type, value}
  }

  query(symbol) {
    const value = this.symbols[symbol]
    if (!value) {
      throw 'symbol not defined'
    }
    return value
  }
}
