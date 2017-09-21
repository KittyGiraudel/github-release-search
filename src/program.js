const program = require('commander')

program
  .option('-s, --search <search>', 'Search term')
  .option('-s, --owner <owner>', 'GitHub user or organisation name')
  .option('-s, --repo <repo>', 'GitHub repository name')
  .option('-s, --cacheFile <repo>', 'Path to cache file')
  .option('-b, --fetch', 'Fetch releases from GitHub')
  .parse(process.argv)

module.exports = program
