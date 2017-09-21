# GitHub release search

This small command line utility aims at searching through release notes for a certain search term. This can be useful when looking for the release date of a certain feature or pull request number.

## Install

```sh
git clone git@github.com:HugoGiraudel/github-release-search
cd github-release-search
npm install
```

Create a [personal GitHub access token](https://github.com/settings/tokens) with read access on repositories, then put it in an `.env` file like so:

```
OAUTH_TOKEN=your_token_here
```

## Usage

Fetching releases and caching them (path can be specific with `--cacheFile`) to speed things up and avoid API limitations:

```
npm run fetch --owner ownerName --repo repoName
```

Searching for something:

```
npm run search "hello" --owner ownerName --repo repoName
```

To avoid having to pass the owner and repository name everytime, you can put them in your `.env` file:

```sh
OWNER=HugoGiraudel
REPO=github-release-search
```

## Example

```
$ npm run search "graphql"
> node src/index.js --search "graphql"

Date  September 13th 2017
Tag   3.3.0
Name  The one with the new bank account
Url   https://github.com/n26/goldfish/releases/tag/3.3.0
Line  Add apollo webpack-loader and move all queries to `.graphql` files (#1423)
```
