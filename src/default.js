const chalk = require('chalk')
const {getHitokoto} = require('./lib/api')

exports.command = '*'

exports.handler = argv => {
  getHitokoto()
    .then(res => {
      const data = res.data

      console.log(chalk.cyan(`${data.hitokoto} -- <<${data.from}>>`))
      console.log()
      console.log(chalk.yellow('Try "dora --help"'))
    })
    .catch(() => {
      console.log(chalk.yellow('Try "dora --help"'))
    })
}
