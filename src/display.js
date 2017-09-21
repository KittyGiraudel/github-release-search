const { compare } = require('semver')
const chalk = require('chalk')

const regExpEscape = s => s.replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&')

const processLine = term => line =>
  line
    // Remove bullet
    .replace(/^[\+\*\-]\s+/, '')
    // Highlight search term (while preserving case)
    .replace(new RegExp('(' + term + ')', 'i'), (replace, termi) => {
      return chalk.bold.blue(termi)
    })

const getLine = (body, term) => {
  const re = new RegExp('^.*?(' + regExpEscape(term) + ').*$', 'img')
  const lines = []
  let match

  while ((match = re.exec(body)) !== null) {
    lines.push(match[0])
  }

  return lines
    .map(processLine(term))
    .join('\n      ')
}

const orderByDate = (a, b) => compare(a.tag_name, b.tag_name)

const displayMatch = term => match => {
  const date = new Date(match.published_at).toUTCString()
  const context = getLine(match.body, term)

  console.log(chalk.yellow('Date '), date)
  console.log(chalk.yellow('Tag  '), match.tag_name)

  if (match.name !== match.tag_name) {
    console.log(chalk.yellow('Name '), match.name)
  }

  console.log(chalk.yellow('Url  '), match.html_url)
  console.log(chalk.yellow('Lines'), context)
  console.log('')
}

module.exports = (matches, term) => {
  matches
    .slice(0)
    .sort(orderByDate)
    .forEach(displayMatch(term))
}
