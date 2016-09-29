export const types = Object.freeze({
  _indentifier: "identifier",
  _symbol: "symbol",
  _number: "number",
  _string: "string",
  _function: "function",
});

class AwaSymbol {
  constructor() {

  }
}

class AwaFunction {
  constructor(func) {
    this.func = func
  }

  run(...args) {
    this.func.apply(this, args)
  }
}
