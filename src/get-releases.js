const fs = require('fs')
const util = require('util')
const path = require('path')
const { PER_PAGE, GITHUB_CLIENT } = require('./constants')
const readFile = util.promisify(fs.readFile)
const mkdirp = require('mkdirp')

const readCache = cacheFile => readFile(cacheFile, 'utf8').then(JSON.parse)

const writeCache = (cacheFile, data) =>
  mkdirp(path.dirname(cacheFile)).then(() =>
    fs.writeFileSync(cacheFile, JSON.stringify(data), 'utf8')
  )

const fetchReleases = async options => {
  let currentPage = 0
  let resultsLength = Infinity
  let releases = []

  while (resultsLength >= PER_PAGE) {
    const { data: results } = await GITHUB_CLIENT.repos.listReleases({
      ...options,
      page: ++currentPage,
      per_page: PER_PAGE
    })
    resultsLength = results.length
    releases = releases.concat(results)
  }

  return releases
}

module.exports = {
  getReleases: cacheFile => readCache(cacheFile),
  fetchReleases: async options => {
    const releases = await fetchReleases(options)
    writeCache(options.cacheFile, releases)
    return releases
  }
}
