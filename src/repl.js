import {evalStr} from './interpreter'

export function repl() {
  const stdin = process.openStdin()
  process.stdout.write('> ')
  stdin.addListener('data', d => {
    console.log(':', evalStr(d.toString().trim()))
    process.stdout.write('> ')
  })
}
// '\r' -- to write over line
