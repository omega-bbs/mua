#!/bin/bash

set -e
[ "$DEBUG" == "true" ] && set -x

NODE_ENV=production SERVER_PORT=80 npm start
