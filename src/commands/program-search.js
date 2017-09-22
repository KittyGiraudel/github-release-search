const program = require('commander')
const parseOptions = require('../parse-options')
const { getReleases } = require('../get-releases')
const searchReleases = require('../search-releases')
const display = require('../display-results')

program
  .option('--since <date|version>', 'Since date/version')
  .option('--until <date|version>', 'Until date/version')
  .option('--format <format>', 'Format to parse --since/--until arguments')
  .option('-r, --repo <repo>', 'GitHub <owner/repository>')
  .parse(process.argv)

;(async () => {
  try {
    const options = parseOptions(program)
    const releases = await getReleases(options.cacheFile)
    const results = await searchReleases(releases, options)

    display(results, options.search)
  } catch (err) {
    console.error(err)
  }
})()
