const github = require("./get-github-client");

require("dotenv").config();

module.exports = () =>
  github.authenticate({
    type: "oauth",
    token: process.env.OAUTH_TOKEN || process.env.GITHUB_TOKEN,
  });
