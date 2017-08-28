#!/bin/bash

set -e
[ "$DEBUG" == "true" ] && set -x

# Build
npm install
NODE_ENV=production npm run build

# Clean up node_modules
# https://github.com/npm/npm/issues/17781
# npm prune --production
rm -rf ./node_modules
NODE_ENV=production npm install

# Clean up npm cache
rm -rf ~/.npm
