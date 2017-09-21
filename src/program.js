const program = require('commander')

program
  .option('-s, --search <search>', 'Search term')
  .option('-o, --owner <owner>', 'GitHub user or organisation name')
  .option('-r, --repo <repo>', 'GitHub repository name')
  .option('-c, --cacheFile <repo>', 'Path to cache file')
  .option('-f, --fetch', 'Fetch releases from GitHub')
  .parse(process.argv)

module.exports = program
