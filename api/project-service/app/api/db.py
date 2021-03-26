from app.config import settings

from datetime import datetime
from databases import Database

from sqlalchemy import (
    Boolean,
    Column,
    create_engine,
    DateTime,
    DECIMAL,
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


projects = Table(
    "projects",
    metadata,
    Column("id", Integer, primary_key=True, index=True),
    Column(
        "title",
        String(50),
        nullable=False,
        index=True,
    ),
    Column(
        "description",
        String(100),
        nullable=False,
        index=True,
    ),
    Column(
        "latitude",
        String(50),
        nullable=False,
        index=True,
    ),
    Column(
        "longitude",
        String(50),
        nullable=False,
        index=True,
    ),
    Column(
        "created_by",
        Integer,
        nullable=False,
        index=True,
    ),
    Column(
        "created_on",
        DateTime(timezone=True),
        nullable=False,
        default=datetime.now,
    ),
    Column(
        "updated_by",
        Integer,
        nullable=True,
        index=True,
    ),
    Column(
        "updated_on",
        DateTime(timezone=True),
        nullable=True,
        default=datetime.now,
        onupdate=datetime.now,
    ),
    Column(
        "is_active",
        Boolean,
        nullable=False,
        default=True,
    ),
)
projectmedia = Table(
    "project_media",
    metadata,
    Column("id", Integer, primary_key=True, index=True),
    Column("project_id", Integer, ForeignKey("projects.id"), index=True),
    Column("media_url", String(100)),
    Column("is_focus", Boolean, nullable=False, default=True),
    Column("alt_text", String(25), nullable=False),
    Column(
        "created_by",
        Integer,
        nullable=False,
        index=True,
    ),
    Column(
        "created_on",
        DateTime(timezone=True),
        nullable=False,
        default=datetime.now,
    ),
    Column(
        "updated_by",
        Integer,
        nullable=True,
        index=True,
    ),
    Column(
        "updated_on",
        DateTime(timezone=True),
        nullable=True,
        default=datetime.now,
        onupdate=datetime.now,
    ),
)
projectteam = Table(
    "project_team",
    metadata,
    Column("id", Integer, primary_key=True, index=True),
    Column("project_id", Integer, ForeignKey("projects.id"), index=True),
    Column("user_id", Integer),
    Column("role", String, nullable=False),
    Column(
        "created_by",
        Integer,
        nullable=False,
        index=True,
    ),
    Column(
        "created_on",
        DateTime(timezone=True),
        nullable=False,
        default=datetime.now,
    ),
    Column(
        "updated_by",
        Integer,
        nullable=True,
        index=True,
    ),
    Column(
        "updated_on",
        DateTime(timezone=True),
        nullable=True,
        default=datetime.now,
        onupdate=datetime.now,
    ),
    Column("is_active", Boolean, default=True),
)
database = Database(DATABASE_URI)
