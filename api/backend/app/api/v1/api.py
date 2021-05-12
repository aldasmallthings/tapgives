from fastapi import APIRouter

from app.api.v1.endpoints import (
    auths,
    project,
    projectmedia,
    projectteam,
    subscriptions,
    usersubscription,
    users,
    utils,
)

api_router = APIRouter()
api_router.include_router(auths.router, tags=["auth"])
api_router.include_router(users.router, prefix="/users", tags=["users"])
api_router.include_router(utils.router, prefix="/utils", tags=["utils"])
api_router.include_router(project.router, prefix="/projects", tags=["projects"])
api_router.include_router(projectmedia.router, prefix="/project-media", tags=["project media"])
api_router.include_router(projectteam.router, prefix="/project-team", tags=["project team"])
api_router.include_router(subscriptions.router, prefix="/subscriptions", tags=["subscription"])
api_router.include_router(
    usersubscription.router, prefix="/usersubscription", tags=["user subscription"]
)
