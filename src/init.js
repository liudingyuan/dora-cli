/**
 * init command
 * 根据指定的模板生成项目开发脚手架
 */

const ora = require('ora')
const chalk = require('chalk')
const path = require('path')
const fs = require('fs')
const spawn = require('child_process').spawn

exports.command = ['init [dir] [bundler]', 'i']
exports.describe = 'init a project with special boilerplate.'
exports.builder = {
  dir: {
    describe: 'the directory name of project.',
    type: 'string',
    default: ''
  },
  bundler: {
    describe: 'select a bundler(webpack or rollup).',
    type: 'string',
    default: 'rollup'
  }
}

const webpackRepo = 'git@github.com:liudingyuan/react-boilerplate.git'
const rollupRepo = 'git@github.com:liudingyuan/rollup-boilerplate.git'

exports.handler = argv => {
  switch (argv.bundler) {
    case 'webpack':
      downloadGitRepo(webpackRepo, argv.dir)
      break
    case 'rollup':
      downloadGitRepo(rollupRepo, argv.dir)
      break
    default:
      console.log(chalk.yellow('No such bundler.'))
  }
}

function downloadGitRepo(repo, dirName) {
  const dir = dirName || getRepoName(repo)
  const args = ['clone', repo, dir]

  if (checkUsedDir(dir)) {
    console.error(chalk.red(`The directory name '${dir}' is used.`))
    return
  }

  const spinner = ora('Loading...').start()

  const gitClone = spawn('git', args)

  gitClone.on('close', status => {
    if (status === 0) {
      spawn('rm', ['-rf', `${dir}/.git`])
      spinner.stop()

      console.log(chalk.cyan('success!'))
      console.log(`use the boilerplate: ${chalk.green(repo)}`)
    } else {
      spinner.stop()
      console.error(chalk.red('Wow, some errors occurred.'))
    }
  })

  gitClone.on('error', err => {
    console.log(chalk.red(err))
  })
}

function getRepoName(repo) {
  if (!repo) {
    return ''
  }

  const points = repo.split('/')

  return points[points.length - 1].replace(/\.git/, '')
}

function checkUsedDir(dir) {
  const dirPath = path.resolve(process.cwd(), dir)

  return fs.existsSync(dirPath)
}
