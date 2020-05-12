const program = require('commander')
const { fetchReleases } = require('../get-releases')
const parseOptions = require('../parse-options')

program
  .option('-c, --cacheDir [dir]', 'Path to cache directory')
  .option('-r, --repo <repo>', 'GitHub <owner/repository>')
  .parse(process.argv)
;(async () => {
  try {
    const { cacheFile, owner, repo } = parseOptions(program)

    await fetchReleases({ cacheFile, owner, repo })
  } catch (err) {
    console.error(err)
  }
})()
