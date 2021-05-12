from sqlalchemy.orm import Session

from app import crud, schema
from app.db.base import Base  # noqa: F401
from app.db.session import engine
from core.config import settings


def init_db(db: Session):
    # Tables should be created with Alembic migrations
    # But if you don't want to use migrations, create
    # the tables un-commenting the next line
    Base.metadata.create_all(bind=engine)

    user = crud.user.get_by_email(db, email=settings.FIRST_SUPERUSER)
    if not user:
        user_in = schema.UserCreate(
            name = settings.FIRST_SUPERUSER_NAME,
            phone = settings.FIRST_SUPERUSER_PHONE,
            email=settings.FIRST_SUPERUSER,
            password=settings.FIRST_SUPERUSER_PASSWORD,
            is_superuser=True,
            disabled=False,
            is_active=True,
        )
        user = crud.user.create(db, obj_in=user_in)  # noqa: F841
