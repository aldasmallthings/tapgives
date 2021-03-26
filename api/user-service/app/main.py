import databases
from fastapi import FastAPI, Request
from fastapi_users import FastAPIUsers, models
from fastapi_users.authentication import JWTAuthentication
from fastapi.middleware.cors import CORSMiddleware
from fastapi_users.db import (
    SQLAlchemyBaseUserTable,
    SQLAlchemyUserDatabase,
)
from sqlalchemy import (
    create_engine,
    Boolean,
    Column,
    String,
    Integer
)
from sqlalchemy.ext.declarative import (
    DeclarativeMeta,
    declarative_base,
)

from typing import Optional

from app.config import settings

DATABASE_URL = DATABASE_URI = settings.DATABASE_URI
SECRET = settings.SECRET


class User(models.BaseUser):
    is_staff: Optional[bool] = False
    first_name: str
    last_name: str


class UserCreate(models.BaseUserCreate):
    is_staff: Optional[bool] = False
    first_name: str
    last_name: str


class UserUpdate(User, models.BaseUserUpdate):
    first_name: Optional[str]
    last_name: Optional[str]


class UserDB(User, models.BaseUserDB):
    is_staff: bool
    first_name: str
    last_name: str


database = databases.Database(DATABASE_URL)
Base: DeclarativeMeta = declarative_base()


class UserTable(Base, SQLAlchemyBaseUserTable):
    is_staff = Column(Boolean, default=False, nullable=False)
    first_name = Column(String(length=50), index=True, nullable=False)
    last_name = Column(String(length=50), index=True, nullable=False)
    phone = Column(String(length=50), nullable=False)
    usertype = Column(Integer)

    @classmethod
    def get_full_name(cls):
        return f"{cls.last_name}, {cls.first_name}"


engine = create_engine(DATABASE_URL)
Base.metadata.create_all(engine)

users = UserTable.__table__
user_db = SQLAlchemyUserDatabase(UserDB, database, users)


def on_after_register(user: UserDB, request: Request):
    print(f"User {user.id} has registered.")


def on_after_forgot_password(user: UserDB, token: str, request: Request):
    print(f"User {user.id} has forgot their password. Reset token: {token}")


def after_verification_request(user: UserDB, token: str, request: Request):
    print(f"Verification requested for user {user.id}. Verification token: {token}")


jwt_authentication = JWTAuthentication(
    secret=SECRET,
    lifetime_seconds=3600,
    tokenUrl="/auth/jwt/login",
)

app = FastAPI(
    openapi_url=f"{settings.API_V1_STR}/auth/openapi.json",
    title="wemakeimpact Auth API",
    docs_url=f"{settings.API_V1_STR}/auth/docs",
)
app.add_middleware(
    CORSMiddleware,
    allow_methods=["*"],
    allow_headers=["*"],
)
fastapi_users = FastAPIUsers(
    user_db,
    [jwt_authentication],
    User,
    UserCreate,
    UserUpdate,
    UserDB,
)
app.include_router(
    fastapi_users.get_auth_router(jwt_authentication),
    prefix=f"{settings.API_V1_STR}/auth/jwt",
    tags=["auth"],
)
app.include_router(
    fastapi_users.get_register_router(on_after_register),
    prefix=f"{settings.API_V1_STR}/auth",
    tags=["auth"],
)
app.include_router(
    fastapi_users.get_reset_password_router(
        SECRET,
        after_forgot_password=on_after_forgot_password,
    ),
    prefix=f"{settings.API_V1_STR}/auth",
    tags=["auth"],
)
app.include_router(
    fastapi_users.get_verify_router(
        SECRET, after_verification_request=after_verification_request
    ),
    prefix=f"{settings.API_V1_STR}/auth",
    tags=["auth"],
)
app.include_router(
    fastapi_users.get_users_router(),
    prefix=f"{settings.API_V1_STR}/auth/users",
    tags=["users"],
)


@app.on_event("startup")
async def startup():
    await database.connect()


@app.on_event("shutdown")
async def shutdown():
    await database.disconnect()
