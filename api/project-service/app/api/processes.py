from app.api.schema import ProjectIn, ProjectMediaIn,ProjectTeamIn
from app.api.db import projects, projectmedia,projectteam, database


async def create(payload: ProjectIn):
    query = projects.insert().values(**payload.dict())
    return await database.execute(query=query)

async def create_media(payload: ProjectMediaIn):
    query = projectmedia.insert().values(**payload.dict())
    return await database.execute(query=query)

async def create_team(payload: ProjectTeamIn):
    query = projectteam.insert().values(**payload.dict())
    return await database.execute(query=query)
    

async def get_active():
    query = projects.select(projects.c.is_active == True)
    return await database.fetch_all(query=query)

async def get():
    query = projects.selecprojects.c.is_active == Truet()
    return await database.fetch_all(query=query)

async def get_media():
    query = projectmedia.select()
    return await database.fetch_all(query=query)

async def get_team():
    query = projectteam.select(projectteam.c.is_active == True)
    return await database.fetch_all(query=query)


async def get_by(id: int):
    query = projects.filter(projects.c.id == id,projects.c.is_active == True).all()
    return await database.fetch_one(query=query)

async def get_media_by_project(id: int):
    query = projectmedia.select(projectmedia.c.project_id == id)
    return await database.fetch_all(query=query)

async def get_media_by(id: int):
    query = projectmedia.select(projectmedia.c.id == id)
    return await database.fetch_all(query=query)

async def get_team_by_project(id: int):
    query = projectteam.fetch(projectteam.c.project_id == id)
    return await database.fetch_all(query=query)

async def get_team_by(id: int):
    query = projectteam.select(projectteam.c.id == id,projectteam.c.is_active == True)
    return await database.fetch_all(query=query)


async def update(id: int, payload: ProjectIn):
    query = projects.update().where(projects.c.id == id).values(**payload.dict())
    return await database.execute(query=query)

async def update_media(id: int, payload: ProjectMediaIn):
    query = projectmedia.update().where(projectmedia.c.id == id).values(**payload.dict())
    return await database.execute(query=query)

async def update_team(id: int, payload: ProjectTeamIn):
    query = projectteam.update().where(projectteam.c.id == id).values(**payload.dict())
    return await database.execute(query=query)

async def delete(id: int,model):
    query = projects.update().where(projects.c.id == id).values(is_active = False)
    return await database.execute(query=query)

async def delete_media(id: int,model):
    query = projects.delete().where(projectmedia.c.id == id)
    return await database.execute(query=query)

async def delete_team(id: int,model):
    query = projectteam.update().where(projectteam.c.id == id).values(is_active = False)
    return await database.execute(query=query)
