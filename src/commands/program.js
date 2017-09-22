const program = require('commander')

program
  .command('fetch', 'Fetch releases from GitHub').alias('f')
  .command('search <term>', 'Search term in releases').alias('s')
  .parse(process.argv)
