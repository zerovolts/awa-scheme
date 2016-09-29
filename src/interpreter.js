import {parseStr} from './parser'
import {core} from './lib'

// idea: step-interpreter (generator)

function evalTree(ast) {
  const op = core.query(ast[0].value)
  if (op.type != 'function') throw 'operator not a function'

  return op.value.apply(this, ast.slice(1).map(node => {
    if (Array.isArray(node)) {
      return evalTree(node)
    } else if (node.type === 'identifier') {
      return core.query(node.value).value
    } else {
      return node.value
    }
  }))
}

export function evalStr(str) {
  return evalTree(parseStr(str))
}
