/**
 * bangumi calendar
 */

const chalk = require('chalk')
const ora = require('ora')
const { getBangumi } = require('./lib/api')

exports.command = ['bangumi [time]', 'bgm']
exports.describe = 'check bangumi info'
exports.builder = {
  time: {
    describe: "today or this week's info",
    type: 'string',
    default: 'today'
  }
}

exports.handler = async argv => {
  let day = new Date().getDay()
  day = day === 0 ? 6 : (day - 1)

  const spinner = ora('Loading...').start()
  const data = (await getBangumi()).data

  spinner.stop()

  if (!data || data.length === 0) {
    console.log(chalk.yellow('No content.'))
    return
  }

  switch (argv.time) {
    case 'today':
      printLine(data[day])
      break
    case 'week':
      printLines(data)
      break
    default:
      printLine(data, day)
  }
}

function printLine(data) {
  console.log(`
  ${chalk.green(data.weekday.en)}:
  `)
  data.items.forEach((item, i) => {
    console.log(`  ` + chalk.cyan(`${i + 1}. ${formatName(item.name, item.name_cn)}`))
  })
  console.log()
}

function formatName(name, nameCN) {
  if (name && nameCN) {
    return `${nameCN} (${name})`
  }

  return name || nameCN
}

function printLines(bangumiArr) {
  bangumiArr.forEach(bgm => {
    printLine(bgm)
  })
}


