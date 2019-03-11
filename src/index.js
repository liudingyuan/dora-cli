const yargs = require('yargs')

yargs
  .command(require('./default'))
  .command(require('./init'))
  .command(require('./bangumi'))
  .usage('dora [command] [options]')
  .version()
  .help()
  .argv
