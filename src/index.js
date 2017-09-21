const getReleases = require('./get-releases')
const searchFor = require('./search-for')
const display = require('./display')
const authenticate = require('./authenticate')
const program = require('./program')
const { DEFAULT_CACHE_FILE } = require('./constants')

;(async () => {
  authenticate()

  const releases = await getReleases({
    useCache: !program.fetch,
    cacheFile: program.cacheFile || DEFAULT_CACHE_FILE,
    owner: program.owner || process.env.OWNER,
    repo: program.repo || process.env.REPO
  })

  if (program.search) {
    const results = await searchFor(releases)(program.search)
    display(results, program.search)
  }
})()

if (process.env.NODE_ENV === 'development' || !process.env.NODE_ENV) {
  process.on('unhandledRejection', console.log.bind(console))
}
