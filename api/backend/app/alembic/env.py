# from pathlib import Path
# import sys

# file = Path(__file__).resolve()
# package_root_directory = file.parents[1]
# sys.path.append(str(package_root_directory))


from logging.config import fileConfig
import os

from alembic import context
from sqlalchemy import MetaData, engine_from_config, pool

from app.model import (
    User,
    Project,
    ProjectMedia,
    ProjectTeam,
    Subscription,
    UserSubscription
)

# this is the Alembic Config object, which provides
# access to the values within the .ini file in use.
config = context.config


# other values from the config, defined by the needs of env.py,
# can be acquired:psql -h /tmp/ dbname
# my_important_option = config.get_main_option("my_important_option")
# ... etc.


def get_url():
    user = os.getenv("POSTGRES_USER", "app")
    password = os.getenv("POSTGRES_PASSWORD", "5fade55ae61f5a27")
    server = os.getenv("POSTGRES_SERVER", "localhost")
    port = os.getenv("POSTGRES_PORT", 5436)
    db = os.getenv("POSTGRES_DB", "tapgives_db")
    return f"postgresql://{user}:{password}@{server}:{port}/{db}"


config.set_main_option("sqlalchemy.url", get_url())
# Interpret the config file for Python logging.
# This line sets up loggers basically.
fileConfig(config.config_file_name)


def combine_metadata(*args):
    m = MetaData()
    for metadata in args:
        for t in metadata.tables.values():
            t.tometadata(m)
    return m


# add your model's MetaData object here
# for 'autogenerate' support
# from myapp import mymodel
# target_metadata = mymodel.Base.metadata
target_metadata = combine_metadata(    
    User.metadata,
    Project.metadata,
    ProjectMedia.metadata,
    ProjectTeam.metadata,
    Subscription.metadata,
    UserSubscription.metadata,
)


def run_migrations_offline():
    """Run migrations in 'offline' mode.

    This configures the context with just a URL
    and not an Engine, though an Engine is acceptable
    here as well.  By skipping the Engine creation
    we don't even need a DBAPI to be available.

    Calls to context.execute() here emit the given string to the
    script output.

    """
    url = config.get_main_option("sqlalchemy.url")
    context.configure(
        url=url,
        target_metadata=target_metadata,
        literal_binds=True,
        compare_type=True,
    )

    with context.begin_transaction():
        context.run_migrations()


def run_migrations_online():
    """Run migrations in 'online' mode.

    In this scenario we need to create an Engine
    and associate a connection with the context.

    """
    configuration = config.get_section(config.config_ini_section)
    configuration["sqlalchemy.url"] = get_url()
    connectable = engine_from_config(
        configuration,
        prefix="sqlalchemy.",
        poolclass=pool.NullPool,
    )

    with connectable.connect() as connection:
        context.configure(
            connection=connection,
            target_metadata=target_metadata,
            compare_type=True,
        )

        with context.begin_transaction():
            context.run_migrations()


if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()
