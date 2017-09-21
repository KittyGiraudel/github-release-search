require('dotenv').config()

module.exports = {
  DEFAULT_CACHE_FILE: './.cache/releases',
  // `100` appears to be the maximum amount of entries to be returned by the
  // GitHub API
  // See: https://mikedeboer.github.io/node-github/#api-repos-getReleases
  PER_PAGE: 100
}
