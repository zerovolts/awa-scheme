const fs = require('fs')
import {evalStr} from './interpreter'

// read from file
const srcFile = process.argv[2]
fs.readFile(srcFile, 'utf-8', (err, data) => {
  if (err) throw err;
  console.log(':', evalStr(data))
});
