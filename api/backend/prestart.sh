#! /usr/bin/env bash

# Run migrations
echo "running migrations..\n"
alembic upgrade head
echo "end of running migrations..\n"

# Let the DB start
echo "initialize db with superuser..\n"
python app/pre_backend.py
echo "end of initialize db with superuser\n"

# start uvicorn
echo "initializing app..\n"
uvicorn app.main:app --reload --host 0.0.0.0 --port 80
echo "end of initializing app\n"
