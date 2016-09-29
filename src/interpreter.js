import {parseStr} from './parser'
import {core} from './lib'

// idea: step-interpreter (generator)

function evalExpr(ast) {
  const op = core.query(ast[0].value)
  if (op.type != 'function') throw 'operator not a function'

  return op.value.apply(this, ast.slice(1).map(node => {
    if (Array.isArray(node)) {
      return evalExpr(node)
    } else if (node.type === 'identifier') {
      return core.query(node.value).value
    } else {
      return node.value
    }
  }))
}

export function evalStr(str) {
  // split string into array of expressions
  //return evalExpr(parseStr(str))
  let returnVal = 0
  const exprs = parseStr(str)
  for (const expr of exprs) {
    returnVal = evalExpr(expr)
  }
  return returnVal
}
