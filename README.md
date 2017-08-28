# mua

[![Build Status](https://travis-ci.org/omega-bbs/mua.svg?branch=master)](https://travis-ci.org/omega-bbs/mua)
[![Coverage Status](https://coveralls.io/repos/github/omega-bbs/mua/badge.svg?branch=master)](https://coveralls.io/github/omega-bbs/mua)
[![Docker Build Status](https://img.shields.io/docker/build/omegabbs/mua.svg)](https://hub.docker.com/r/omegabbs/mua/)

Front-end for ω bbs.

## Development

``` shell
# PORT=8080
# CLIENT_PORT=8081
# SERVER_PORT=8082
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
$ npm run docker:build
$ npm run docker:start # 127.0.0.1:8082
```
