
class TokenError {
  constructor(lexeme) {
    this.message = '\'' + lexeme + '\' is not a valid identifier'
    this.name = 'TokenError'
  }
}

class ParseError {
  constructor(message) {
    this.message = message
    this.name = 'ParseError'
  }
}

//------//

const splitter = /\s|(\(|\))/
// split on white space and parens, while keeping parens, then filter out empty strings and undefined
export function lex(str) {
  return str.split(splitter).filter(Boolean)
}

const identifierMatch = /^[A-Za-z\-\+\!\?\*\>\<][\w\-\+\!\?\*\>\<]*$/
const symbolMatch = /^\'[A-Za-z\-\+\!\?\*\>\<][\w\-\+\!\?\*\>\<]*$/
const numberMatch = /^\d+$/
// identifier, symbol, string, number, boolean
export function tokenize(lexemes) {
  return lexemes.map(lexeme => {
    switch (lexeme) {
      case '(':
        return {value: '(', type: 'open-paren'}
        break
      case ')':
        return {value: ')', type: 'close-paren'}
        break
      case (lexeme.match(numberMatch) || {}).input:
        // should handle other types of numbers
        return {value: parseInt(lexeme), type: 'number'}
        break
      case (lexeme.match(symbolMatch) || {}).input:
        return {value: lexeme.slice(1), type: 'symbol'}
        break
      case (lexeme.match(identifierMatch) || {}).input:
        return {value: lexeme, type: 'identifier'}
        break
      default:
        throw new TokenError(lexeme)
        break
    }
  })
}

function checkParens(tokens) {
  const parens = tokens
    .map(token => token.type)
    .filter(tokenType => tokenType === 'open-paren' || tokenType === 'close-paren')

  const count = parens.reduce((count, cur) => {
    if (count < 0) throw new ParseError('mismatched parentheses')
    return count + (cur === 'open-paren' ? 1 : -1)
  }, 0)

  if (count === 0) {
    return count
  } else {
    throw new ParseError('mismatched parentheses')
  }
}

function _parseTokens(tokens) {
  const expression = []

  // returns 1 expression
  while(tokens) {
    const token = tokens.shift()
    switch (token.type) {
      case 'open-paren':
        expression.push(_parseTokens(tokens))
        break
      case 'close-paren':
        return expression
        break
      default:
        expression.push(token)
        break
    }
  }
}

export function parseTokens(tokens) {
  const expressions = []
  checkParens(tokens)

  while(tokens.length > 0) {
    if (tokens.shift().type != 'open-paren') throw 'cannot parse'
    expressions.push(_parseTokens(tokens))
  }
  return expressions
}

export function parseStr(str) {
  return parseTokens(tokenize(lex(str)))
}
