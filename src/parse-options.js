const path = require('path')
const { DEFAULT_CACHE_DIR, DEFAULT_DATE_FORMAT } = require('./constants')

const getCacheFile = (options) => {
  const dir = options.cacheDir || DEFAULT_CACHE_DIR
  const key = options.repo.split('/').join('.')

  return path.resolve(path.join(dir, key))
}

module.exports = options => {
  if (!options.repo || options.repo.indexOf('/') === -1) {
    throw new Error(
      'Pass --repo (-r) to specify a repository with owner and name ' +
      '(e.g. facebookincubator/create-react-app)'
    )
  }

  if (options._name === 'program-search' && !options.args[0]) {
    throw new Error(
      'Pass a search term to search in releases ' +
      '(e.g. lodash)'
    )
  }

  const [ owner, repo ] = options.repo.split('/')

  return {
    cacheFile: getCacheFile(options),
    owner: owner,
    repo: repo,
    search: options.args.join(' '),
    since: options.since,
    until: options.until,
    format: options.format || DEFAULT_DATE_FORMAT
  }
}
