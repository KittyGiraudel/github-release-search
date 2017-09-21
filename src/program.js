const program = require('commander')

program
  // Fetching and caching
  .option('-f, --fetch', 'Fetch releases from GitHub')
  .option('-c, --cacheFile <repo>', 'Path to cache file')

  // Searching
  .option('-s, --search <search>', 'Search term')

  // Project options
  .option('-o, --owner <owner>', 'GitHub user or organisation name')
  .option('-r, --repo <repo>', 'GitHub repository name')

  .parse(process.argv)

module.exports = program
