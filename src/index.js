const fs = require('fs')
import {evalStr} from './interpreter'
import {repl} from './repl'

switch (process.argv.length) {
  case 2:
    repl()
    break
  case 3:
    interpretFile(process.argv[2])
    break
}

function interpretFile(fileHandle) {
  fs.readFile(fileHandle, 'utf-8', (err, data) => {
    if (err) throw err;
    console.log(':', evalStr(data))
  });
}
