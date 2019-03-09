const yargs = require('yargs')

yargs
  .command(require('./default'))
  .command(require('./init'))
  .version()
  .help()
  .argv
