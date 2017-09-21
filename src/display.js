const format = require('date-fns/format')
const { compare } = require('semver')
const chalk = require('chalk')

const regExpEscape = s => s.replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&')

const getLine = (body, term) => {
  const re = new RegExp('^.*?\\b(' + regExpEscape(term) + ')\\b.*$', 'im')
  const match = body.match(re)[0]

  return match.slice(2)
}

const orderByDate = (a, b) => compare(a.tag_name, b.tag_name)

const displayMatch = term => match => {
  const date = format(match.published_at, 'MMMM Do YYYY')
  const context = getLine(match.body, term)

  console.log('')
  console.log(chalk.yellow('Date '), date)
  console.log(chalk.yellow('Tag  '), match.tag_name)
  console.log(chalk.yellow('Name '), match.name)
  console.log(chalk.yellow('Url  '), match.html_url)
  console.log(chalk.yellow('Line '), context)
}

module.exports = (matches, term) => {
  matches
    .slice(0)
    .sort(orderByDate)
    .forEach(displayMatch(term))
}
