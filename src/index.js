const path = require('path')
const getReleases = require('./get-releases')
const searchFor = require('./search-releases')
const display = require('./display-results')
const authenticate = require('./authenticate')
const program = require('./program')
const { DEFAULT_CACHE_DIR, DEFAULT_DATE_FORMAT } = require('./constants')

const getCacheFile = (cacheDir, owner, repo) => {
  const dir = cacheDir || DEFAULT_CACHE_DIR
  const key = owner + '.' + repo

  return path.resolve(path.join(dir, key))
}

;(async () => {
  authenticate()
  const owner = program.owner || process.env.OWNER
  const repo = program.repo || process.env.REPO

  // Split given owner/repo string into individual components for the API
  const releases = await getReleases({
    useCache: !program.fetch,
    cacheFile: getCacheFile(program.cacheDir, owner, repo),
    owner: owner,
    repo: repo
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
