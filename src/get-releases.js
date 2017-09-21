const fs = require('mz/fs')
const { writeFileSync } = require('fs')
const github = require('./get-client')
const { PER_PAGE } = require('./constants')

const getReleasesBatch = (page, options) =>
  new Promise((resolve, reject) => {
    const githubOptions = {
      owner: options.owner,
      repo: options.repo,
      page: options.page,
      per_page: PER_PAGE
    }

    github.repos.getReleases(githubOptions, (err, res) => {
      if (err) reject(err)
      else resolve(res.data)
    })
  })

const readCache = cacheFile =>
  fs.readFile(cacheFile, 'utf8').then(JSON.parse)

const writeCache = (cacheFile, data) =>
  writeFileSync(cacheFile, JSON.stringify(data), 'utf8')

module.exports = async options => {
  if (options.useCache) {
    return readCache(options.cacheFile)
  }

  let currentPage = 0
  let currentResultsLength = Infinity
  let results = []

  while (currentResultsLength > PER_PAGE) {
    const currentResults = await getReleasesBatch(++currentPage, options)
    currentResultsLength = currentResults.length
    results = results.concat(currentResults)
  }

  writeCache(options.cacheFile, results)

  return results
}
