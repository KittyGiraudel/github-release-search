const program = require('commander')

program
  // Fetching and caching
  .option('-f, --fetch', 'Fetch releases from GitHub')
  .option('-c, --cacheDir [dir]', 'Path to cache directory')

  // Searching
  .option('-s, --search <search>', 'Search term')
  .option('--since <date|version>', 'Since date/version')
  .option('--until <date|version>', 'Until date/version')
  .option('--format <format>', 'Format to parse --since/--until arguments')

  // Project options
  .option('-o, --owner <owner>', 'GitHub user or organisation name')
  .option('-r, --repo <repo>', 'GitHub repository name')

  .parse(process.argv)

module.exports = program
