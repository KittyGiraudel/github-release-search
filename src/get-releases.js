const fs = require('fs')
const util = require('util')
const { writeFileSync } = require('fs')
const github = require('./get-github-client')
const { PER_PAGE } = require('./constants')
const readFile = util.promisify(fs.readFile)

const fetchReleasesBatch = (page, options) =>
  new Promise((resolve, reject) => {
    const fetchOptions = {
      owner: options.owner,
      repo: options.repo,
      page: page,
      per_page: PER_PAGE
    }

    github.repos.getReleases(fetchOptions, (err, res) => {
      if (err) reject(err)
      else resolve(res.data)
    })
  })

const readCache = cacheFile =>
  readFile(cacheFile, 'utf8').then(JSON.parse)

const writeCache = (cacheFile, data) =>
  writeFileSync(cacheFile, JSON.stringify(data), 'utf8')

const fetchReleases = async options => {
  let currentPage = 0
  let resultsLength = Infinity
  let releases = []

  while (resultsLength > PER_PAGE) {
    const results = await fetchReleasesBatch(++currentPage, options)
    resultsLength = results.length
    releases = releases.concat(results)
  }

  return releases
}

module.exports = async options => {
  if (options.useCache) {
    return readCache(options.cacheFile)
  }

  const results = await fetchReleases(options)
  writeCache(options.cacheFile, results)

  return results
}
