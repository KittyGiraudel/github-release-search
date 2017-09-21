const semver = require('semver')
const moment = require('moment')
const regex = require('./regex')

const isBeforeSince = (release, since, format) => {
  if (!since) return false

  if (semver.valid(since) !== null) {
    return semver.compare(since, release.tag_name) === 1
  } else {
    return moment(since, format).isAfter(release.published_at)
  }
}

const isAfterUntil = (release, until, format) => {
  if (!until) return false

  if (semver.valid(until) !== null) {
    return semver.compare(until, release.tag_name) === -1
  } else {
    return moment(until, format).isBefore(release.published_at)
  }
}

const isInRange = options => release => {
  const { since, until, format } = options

  if (isBeforeSince(release, since, format)) return false
  if (isAfterUntil(release, until, format)) return false

  return true
}

module.exports = (releases, options) => {
  return releases
    .filter(release => !release.draft)
    .filter(isInRange(options))
    .filter(release => regex.search(options.search).test(release.body))
}
