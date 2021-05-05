#! /usr/bin/env bash

# Run migrations
alembic upgrade head

# Let the DB start
python /app/pre_backend.py
