# mua

[![Build Status](https://circleci.com/gh/omega-bbs/mua.svg?style=shield)](https://circleci.com/gh/omega-bbs/mua)
[![Coverage Status](https://codecov.io/gh/omega-bbs/mua/graph/badge.svg)](https://codecov.io/gh/omega-bbs/mua)
[![Docker Build Status](https://img.shields.io/docker/build/omegabbs/mua.svg)](https://hub.docker.com/r/omegabbs/mua/)

Front-end for ω bbs.

## Prerequisites

- [Node.js](https://nodejs.org/) 8.x
- [npm](https://www.npmjs.com/) 5

## Setup

``` shell
$ git config diff.nodiff.command /usr/bin/true # recommended

$ npm install
```

### Editor Integrations (recommended)

- [EditorConfig](http://editorconfig.org/#download)
- [ESLint](https://eslint.org/docs/user-guide/integrations)
- [Prettier](https://prettier.io/docs/en/editors.html)
- [styled-components](https://github.com/styled-components/styled-components#syntax-highlighting)

## Development

``` shell
# PORT=8080
# API_PORT=8000

$ npm run dev # 127.0.0.1:8080
```

### Lint / Format

``` shell
$ npm run lint
$ npm run format
```

### Test

``` shell
$ npm run jest
```

### Docker

```shell
# PORT=8080

$ npm run docker:build
$ npm run docker:start # 127.0.0.1:8080
```

### Analyze

``` shell
$ NODE_ENV=production npm run build
$ npm run analyze
```

## License

[GNU Affero General Public License Version 3](https://www.gnu.org/licenses/agpl-3.0.en.html) (AGPL 3.0)
