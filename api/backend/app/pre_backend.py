import logging

from tenacity import after_log, before_log, retry, stop_after_attempt, wait_fixed

from app.db.init_db import init_db
from app.db.session import SessionLocal

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

max_tries = 60 * 5  # 5 minutes
wait_seconds = 1


@retry(
    stop=stop_after_attempt(max_tries),
    wait=wait_fixed(wait_seconds),
    before=before_log(logger, logging.INFO),
    after=after_log(logger, logging.WARN),
)
def app_init():
    try:
        # Try to create session to check if DB is awake
        db = SessionLocal()
        db.execute("SELECT 1")
    except Exception as e:
        logger.error(e)
        raise e


def db_init():
    db = SessionLocal()
    init_db(db)


def main():
    logger.info("Initializing service..")
    app_init()
    logger.info("Service finished initializing.")
    logger.infor("Creating initial data..")
    db_init()
    logger.info("Initial data created.")


if __name__ == "__main__":
    main()
