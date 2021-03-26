from typing import List
from fastapi import APIRouter, HTTPException

from app.api.schema import (
    ProjectIn,
    ProjectMediaIn,
    ProjectTeamIn,
    ProjectOut,
    ProjectMediaOut,
    ProjectTeamOut,
    ProjectUpdate,
    ProjectMediaUpdate,
    ProjectTeamUpdate,
)
from app.api import processes

projectsapi = APIRouter()
projectmedia = APIRouter()
projectteams = APIRouter()


@projectsapi.get("/active", response_model=List[ProjectOut])
async def get_active_projects():
    return await processes.get_active()


@projectsapi.get("/all", response_model=List[ProjectOut])
async def get_projects():
    return await processes.get()


@projectmedia.get("/", response_model=List[ProjectMediaOut])
async def get_project_media():
    return await processes.get_media()


@projectteams.get("/", response_model=List[ProjectMediaOut])
async def get_project_team():
    return await processes.get_team()


@projectsapi.get("/{id}/", response_model=ProjectOut)
async def get_project(id: int):
    project = await processes.get_by(id)
    if not project:
        raise HTTPException(
            status_code=404,
            detail="Project not found",
        )
    return project


@projectmedia.get("/{id}/", response_model=ProjectMediaOut)
async def get_project_media(id: int):
    project_media = await processes.get_media_by(id)
    if not project_media:
        raise HTTPException(
            status_code=404,
            detail="Media not found",
        )
    return project_media


@projectmedia.get("/project-media/{id}/", response_model=ProjectMediaOut)
async def get_project_media(id: int):
    project_media = await processes.get_media_by_project(id)
    if not project_media:
        raise HTTPException(
            status_code=404,
            detail="Media not found",
        )
    return project_media


@projectteams.get("/{id}/", response_model=ProjectTeamOut)
async def get_project_team(id: int):
    project_team = await processes.get_team_by(id)
    if not project_team:
        raise HTTPException(
            status_code=404,
            detail="Team not found",
        )
    return project_team


@projectteams.get("/project-team/{id}/", response_model=ProjectTeamOut)
async def get_project_team(id: int):
    project_team = await processes.get_team_by_project(id)
    if not project_team:
        raise HTTPException(
            status_code=404,
            detail="Team not found",
        )
    return project_team


@projectsapi.post("/", response_model=ProjectOut, status_code=201)
async def create_project(payload: ProjectIn):
    project_id = await processes.create(payload)
    response = {"id": project_id, **payload.dict()}
    return response


@projectmedia.post("/", response_model=ProjectOut, status_code=201)
async def create_project_media(payload: ProjectMediaIn):
    media_id = await processes.create_media(payload)
    response = {"id": media_id, **payload.dict()}
    return response


@projectteams.post("/team", response_model=ProjectOut, status_code=201)
async def create_project_team(payload: ProjectTeamIn):
    team_id = await processes.create_team(payload)
    response = {"id": team_id, **payload.dict()}
    return response



@projectsapi.put("/{id}/", response_model=ProjectOut)
async def update_project(id: int, payload: ProjectUpdate):
    project = await processes.get_by(id)
    if not project:
        raise HTTPException(
            status_code=404,
            detail="Project not found",
        )
    update_data = payload.dict(exclude_unset=True)
    project_in_db = ProjectIn(**Project)
    updated_project = project_in_db.copy(update=update_data)
    result_id = await processes.update(id, updated_project)
    return await processes.get_by(result_id)


@projectmedia.put("/{id}/", response_model=ProjectMediaOut)
async def update_media(id: int, payload: ProjectMediaUpdate):
    media = await processes.get_media_by(id)
    if not media:
        raise HTTPException(
            status_code=404,
            detail="Media not found",
        )
    update_data = payload.dict(exclude_unset=True)
    media_in_db = ProjectMediaIn(**Media)
    updated_media = media_in_db.copy(update=update_data)
    result_id = await processes.update_media(id, updated_media)
    return await processes.get_media_by(result_id)


@projectteams.put("/{id}/", response_model=ProjectTeamOut)
async def update_team(id: int, payload: ProjectTeamUpdate):
    team = await processes.get_team_by(id)
    if not team:
        raise HTTPException(
            status_code=404,
            detail="Project not found",
        )
    update_data = payload.dict(exclude_unset=True)
    team_in_db = ProjectTeamIn(**Team)
    updated_team = team_in_db.copy(update=update_data)
    result_id = await processes.update_team(id, updated_project)
    return await processes.get_team_by(result_id)


@projectsapi.delete("/{id}/", response_model=None)
async def delete_project(id: int):
    project = await processes.get_by(id)
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    return await processes.delete(id)


@projectmedia.delete("/{id}/", response_model=None)
async def delete_media(id: int):
    media = await processes.get_media_by(id)
    if not media:
        raise HTTPException(status_code=404, detail="Media not found")
    return await processes.delete_media(id)


@projectteams.delete("/{id}/", response_model=None)
async def delete_team(id: int):
    team = await processes.get_team_by(id)
    if not team:
        raise HTTPException(status_code=404, detail="Team not found")
    return await processes.delete_team(id)
