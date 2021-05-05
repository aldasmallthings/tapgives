#!/bin/sh -e
set -x

# Sort imports one per line, so autoflake can remove unused imports
isort --recursive  --force-single-line-imports --apply .
isort -m 3 -t FORCE_TO_TOP --tc --fss .
autoflake --remove-all-unused-imports --remove-unused-variables -r -i . --exclude=__init__.py
isort -m 3 -t FORCE_TO_TOP .
black . -l 90 -v --safe
