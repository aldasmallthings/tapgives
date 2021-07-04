from sqlalchemy import Boolean, Column, DateTime
from sqlalchemy.ext.declarative import declarative_base, declared_attr
from sqlalchemy.orm import Session
from sqlalchemy.sql import func


class BaseModel(object):
    __abstract__ = True

    disabled = Column(Boolean, default=False)
    created_on = Column(DateTime(timezone=True), server_default=func.now())
    updated_on = Column(DateTime(timezone=True), onupdate=func.now())

    # Generate __tablename__ automatically
    @declared_attr
    def __tablename__(cls):
        return cls.__name__.lower()

    def save(self, db: Session):
        """Commit record to db."""
        try:
            db.add(self)
            db.commit()
            db.refresh(self)
        except Exception:
            db.rollback()
        return self


Base = declarative_base(cls=BaseModel)
