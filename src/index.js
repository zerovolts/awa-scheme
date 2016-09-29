import {parseStr} from './parser'
import {evalStr} from './interpreter'

// lexer : string -> lexemes -> tokens
// parser : tokens -> ast
// interpreter : ast -> result

const input = '(+ 3 4 (- 4 2))'
console.log(evalStr(input))
