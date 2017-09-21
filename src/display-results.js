const { compare } = require('semver')
const chalk = require('chalk')
const regex = require('./regex')
const BULLET_REGEX = /^[\+\*\-]\s+/
const INDENT = '\n      '

const processLine = matchRegex => line =>
  line
    // Remove bullet
    .replace(BULLET_REGEX, '')
    // Highlight search term (while preserving case)
    .replace(matchRegex, (_, match) => chalk.bold.blue(match))

const getLines = (body, term) => {
  const searchRegex = regex.search(term)
  const matchRegex = regex.match(term)
  const lines = []
  let match

  while ((match = searchRegex.exec(body)) !== null) {
    lines.push(match[0])
  }

  return lines.map(processLine(matchRegex)).join(INDENT)
}

const orderByVersion = (a, b) => compare(a.tag_name, b.tag_name)

const displayMatch = term => match => {
  const date = new Date(match.published_at).toUTCString()
  const lines = getLines(match.body, term)

  console.log(chalk.yellow('Date '), date)
  console.log(chalk.yellow('Tag  '), match.tag_name)

  if (match.name !== match.tag_name) {
    console.log(chalk.yellow('Name '), match.name)
  }

  console.log(chalk.yellow('Url  '), match.html_url)
  console.log(chalk.yellow('Lines'), lines)
  console.log('')
}

module.exports = (matches, term) => {
  matches
    .sort(orderByVersion)
    .forEach(displayMatch(term))
}
