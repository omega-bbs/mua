#!/bin/bash
set -eo pipefail

[[ $DEBUG == true ]] && set -x

export NODE_ENV=${NODE_ENV:-production}
export SERVER_PORT=${SERVER_PORT:-80}

case ${1} in
  start)
    npm start
    ;;
  *)
    exec "$@"
    ;;
esac

exit 0
