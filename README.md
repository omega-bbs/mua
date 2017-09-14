# mua

[![Build Status](https://circleci.com/gh/omega-bbs/mua.svg?style=shield)](https://circleci.com/gh/omega-bbs/mua)
[![Coverage Status](https://codecov.io/gh/omega-bbs/mua/graph/badge.svg)](https://codecov.io/gh/omega-bbs/mua)
[![Docker Build Status](https://img.shields.io/docker/build/omegabbs/mua.svg)](https://hub.docker.com/r/omegabbs/mua/)

Front-end for ω bbs.

## Prerequisites

- [Node.js](https://nodejs.org/) 8.x
- [npm](https://www.npmjs.com/) 5
- [Caddy](https://caddyserver.com/)

## Development

``` shell
# PORT=8080
# API_PORT=8000

$ npm run dev # 127.0.0.1:8080
```

## Lint / Format

``` shell
$ npm run lint
$ npm run prettier
```

## Test

``` shell
$ npm run jest
```

## Docker

```shell
# PORT=8080

$ npm run docker:build
$ npm run docker:start # 127.0.0.1:8080
```
