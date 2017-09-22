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

Fetching releases and caching them (path can be specific with `--cacheDir`) to speed things up and avoid API limitations:

```
npm run fetch -- --repo owner/repo
```

Searching for something:

```
npm run search -- "hello" --repo owner/repo
```

To narrow down the results, you can use `--until` and `--since` flags which accept either a [SemVer](http://semver.org/) version or a date (default format `DD/MM/YYYY`, can be passed with `--format`).

```
npm run search -- "hello" --repo owner/repo --since 2.1.0
npm run search -- "hello" --repo owner/repo --since 23/04/2017
npm run search -- "hello" --repo owner/repo --since 04/23/2017 --format MM/DD/YYYY
npm run search -- "hello" --repo owner/repo --since 2.1.0 --until 3.0.5
```

## Example

```
$ npm run search -- "lodash" --repo facebookincubator/create-react-app

> node src/commands/program.js search "lodash" "--repo" "facebookincubator/create-react-app"

Date  Mon, 28 Aug 2017 02:27:45 GMT
Tag   v1.0.12
Url   https://github.com/facebookincubator/create-react-app/releases/tag/v1.0.12
Lines [#2938](https://github.com/facebookincubator/create-react-app/pull/2938) Remove superfluous lodash usage. ([@Timer](https://github.com/Timer))
```
