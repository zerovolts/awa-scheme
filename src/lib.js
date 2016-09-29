import SymbolTable from './symbol-table'

// built-ins?
export const core = new SymbolTable()

core.register('pi', 'number', 3.1415)
core.register('+', 'function', (...args) => args.reduce((pre, cur) => pre + cur))
core.register('-', 'function', (...args) => args.reduce((pre, cur) => pre - cur))
core.register('define', 'function', (symbol, def) => core.register(symbol, def.type, def.value)) // user.register?
core.register('print', 'function', (str) => console.log(str))
