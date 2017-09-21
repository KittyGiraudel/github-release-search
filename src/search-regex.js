const regExpEscape = s => s.replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&')

module.exports = term => new RegExp('^.*?(' + regExpEscape(term) + ').*$', 'img')
