require('dotenv').config()

module.exports = {
  DEFAULT_DATE_FORMAT: 'DD/MM/YYYY',
  DEFAULT_CACHE_DIR: './.cache',
  // `100` appears to be the maximum amount of entries to be returned by the
  // GitHub API
  // See: https://mikedeboer.github.io/node-github/#api-repos-getReleases
  PER_PAGE: 100
}
