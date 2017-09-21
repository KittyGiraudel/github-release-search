const searchRegex = require('./search-regex')

module.exports = (releases, term) => {
  return releases
    .filter(release => !release.draft)
    .filter(release => searchRegex(term).test(release.body))
}
