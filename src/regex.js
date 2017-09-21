const regExpEscape = s => s.replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&')

module.exports = {
  search: term => new RegExp('^.*?(' + regExpEscape(term) + ').*$', 'img'),
  match: term => new RegExp('(' + regExpEscape(term) + ')', 'i')
}
