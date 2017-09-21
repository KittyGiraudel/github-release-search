module.exports = (releases, term) => {
  return releases
    .filter(release => !release.draft)
    .filter(release => release.body.indexOf(term.trim()) > -1)
}
