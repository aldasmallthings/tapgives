from app.config import settings

from datetime import datetime
from databases import Database

from sqlalchemy import (
    Boolean,
    Column,
    create_engine,
    DateTime,
    ForeignKey,
    Integer,
    MetaData,
    String,
    Text,
    Table,
)


DATABASE_URL = DATABASE_URI = settings.DATABASE_URI

engine = create_engine(DATABASE_URI)
metadata = MetaData()


subscriptions = Table(
    "subscriptions",
    metadata,
    Column("id", Integer, primary_key=True, index=True),
    Column("price", String(50),nullable = False),
    Column("charge_cadance",String(100),nullable=False),
    Column("token_type",String(50),nullable=False),
    Column("token_amount",Integer,nullable = False),
    Column("token_cadance",String(100),nullable = False),
    Column(
        "is_active",
        Boolean,
        nullable=False,
        default=True,
    ),
    Column(
        "created_on",
        DateTime(timezone=True),
        nullable=False,
        default=datetime.now,
    ),
    Column(
        "updated_on",
        DateTime(timezone=True),
        nullable=True,
        default=datetime.now,
        onupdate=datetime.now,
    ),
    Column(
        "updated_by",
        Integer,
        nullable=True,
        index=True,
    )
)
usersubs = Table(
    "user_subs",
    metadata,
    Column("id", Integer, primary_key=True, index=True),
    Column("sub_id", Integer, ForeignKey("subscriptions.id"), index=True,nullable=False),
    Column("user_id", Integer, index=True,nullable=False),
    Column("project_id", Integer, index=True,nullable=False),
    Column("is_active", Boolean, nullable=False, default=True),
    Column("updated_by",Integer),
    Column(
        "created_on",
        DateTime(timezone=True),
        nullable=False,
        default=datetime.now,
    ),
    Column(
        "updated_on",
        DateTime(timezone=True),
        nullable=True,
        default=datetime.now,
        onupdate=datetime.now,
    ),
)

database = Database(DATABASE_URI)
