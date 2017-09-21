const format = require('date-fns/format')
const { compare } = require('semver')
const chalk = require('chalk')

const regExpEscape = s => s.replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&')

const getLine = (body, term) => {
  const re = new RegExp('^.*?(' + regExpEscape(term) + ').*$', 'im')
  const match = body.match(re)

  // In case the search term cannot be safely retreived for any reason
  if (!match) {
    return '—'
  }

  return match[0]
    // Remove bullet
    .slice(2)
    // Highlight search term (while preserving case)
    .replace(new RegExp('(' + term + ')', 'i'), (replace, termi) => {
      return chalk.bold.blue(termi)
    })
}

const orderByDate = (a, b) => compare(a.tag_name, b.tag_name)

const displayMatch = term => match => {
  const date = format(match.published_at, 'MMMM Do YYYY')
  const context = getLine(match.body, term)

  console.log(chalk.yellow('Date '), date)
  console.log(chalk.yellow('Tag  '), match.tag_name)

  if (match.name !== match.tag_name) {
    console.log(chalk.yellow('Name '), match.name)
  }

  console.log(chalk.yellow('Url  '), match.html_url)
  console.log(chalk.yellow('Line '), context)
  console.log('')
}

module.exports = (matches, term) => {
  matches
    .slice(0)
    .sort(orderByDate)
    .forEach(displayMatch(term))
}
