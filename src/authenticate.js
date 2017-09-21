const github = require('./get-client')

require('dotenv').config()

module.exports = () => github.authenticate({
  type: 'oauth',
  token: process.env.OAUTH_TOKEN
})
