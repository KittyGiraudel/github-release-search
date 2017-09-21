const path = require('path')
const getReleases = require('./get-releases')
const searchFor = require('./search-releases')
const display = require('./display-results')
const authenticate = require('./authenticate')
const program = require('./program')
const { DEFAULT_CACHE_FILE, DEFAULT_DATE_FORMAT } = require('./constants')

;(async () => {
  authenticate()

  const releases = await getReleases({
    useCache: !program.fetch,
    cacheFile: path.resolve(program.cacheFile || DEFAULT_CACHE_FILE),
    owner: program.owner || process.env.OWNER,
    repo: program.repo || process.env.REPO
  })

  if (program.search) {
    const results = await searchFor(releases, {
      search: program.search,
      since: program.since,
      until: program.until,
      format: program.format || DEFAULT_DATE_FORMAT
    })

    display(results, program.search)
  }
})()

if (process.env.NODE_ENV === 'development' || !process.env.NODE_ENV) {
  process.on('unhandledRejection', console.log.bind(console))
}
