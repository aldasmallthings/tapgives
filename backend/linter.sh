#!/usr/bin/env bash

set -x

mypy --pretty .
black --check .
isort --check-only .
flake8 --max-line-length=90 .
