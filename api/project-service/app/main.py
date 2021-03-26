from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.projects import projectsapi, projectmedia,projectteams
from app.api.db import metadata, database, engine
from app.config import settings

metadata.create_all(engine)

app = FastAPI(
    openapi_url=f"{settings.API_V1_STR}/projects/openapi.json",
    title="WE-MAKE-IMPACT tapgives API",
    docs_url=f"{settings.API_V1_STR}/projects/docs",
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
    projectsapi,
    prefix=f"{settings.API_V1_STR}/projects",
    tags=["projects"],
)

app.include_router(
    projectmedia,
    prefix=f"{settings.API_V1_STR}/projects/media",
    tags=["project media"],
)

app.include_router(
    projectteams,
    prefix=f"{settings.API_V1_STR}/projects/team",
    tags=["project teams"],
)