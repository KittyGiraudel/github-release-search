const regex = require('./regex')

module.exports = (releases, term) => {
  return releases
    .filter(release => !release.draft)
    .filter(release => regex.search(term).test(release.body))
}
