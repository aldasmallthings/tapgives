from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.subs import getsubs,postsubs,putsubs,deletesubs
from app.api.db import metadata, database, engine
from app.config import settings

metadata.create_all(engine)

app = FastAPI(
    openapi_url=f"{settings.API_V1_STR}/subs/openapi.json",
    title="WE-MAKE-IMPACT tapgives API subscription API",
    docs_url=f"{settings.API_V1_STR}/subs/docs",
)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
async def startup():
    await database.connect()


@app.on_event("shutdown")
async def shutdown():
    await database.disconnect()


app.include_router(
    getsubs,
    prefix=f"{settings.API_V1_STR}/subs",
    tags=["Get subscriptions"],
)

app.include_router(
    postsubs,
    prefix=f"{settings.API_V1_STR}/subs",
    tags=["Post subscriptions"],
)

app.include_router(
    putsubs,
    prefix=f"{settings.API_V1_STR}/subs",
    tags=["Put subscriptions"],
)

app.include_router(
    deletesubs,
    prefix=f"{settings.API_V1_STR}/subs",
    tags=["Delete subscriptions"],
)