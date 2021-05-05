from typing import Optional
from datetime import datetime

from pydantic import BaseModel

# Shared properties
class Project(BaseModel):
    title: str
    description: dict
    latitude: str
    longitude: str
    created_on: datetime
    updated_on: datetime
    created_by: int
    updated_by : int
    is_active: Optional[bool] = True

class ProjectMedia(BaseModel):
    project_id: int
    media_url: str
    created_on: datetime
    updated_on: datetime
    created_by: str
    updated_by : int
    is_profile: Optional[bool] = True


class ProjectTeam(BaseModel):
    project_id: int
    user_id: int
    role: str
    created_on: datetime
    updated_on: datetime
    created_by: int
    updated_by: int
    is_active: Optional[bool] = True

#project schema
class ProjectCreate(Project):
    pass

class ProjectUpdate(Project):
    title: Optional[str] = None
    description: Optional[dict] = None
    latitude: Optional[str] = None
    longitude: Optional[str] = None
    created_on: Optional[datetime] = None
    updated_on: datetime
    created_by: Optional[int] = None
    updated_by : int
    is_active: Optional[bool] = True

class ProjectDelete(Project):
    pass


#project media schema
class ProjectMediaCreate(ProjectMedia):
    pass

class ProjectMediaUpdate(ProjectMedia):
    media_url: Optional[str] = None
    created_on: Optional[datetime] = True
    updated_on : datetime
    created_by: Optional[int]=None
    updated_by : int
    is_profile: Optional[bool] = True

class ProjectMediaDelete(ProjectMedia):
    pass


#project team schema

class ProjectTeamCreate(ProjectTeam):
    pass

class ProjectTeamUpdate(ProjectTeam):
    project_id: Optional[int] = None
    user_id: Optional[int] = None
    role: Optional[str] = None
    created_on: Optional[datetime] = None
    updated_on : datetime
    created_by: Optional[int] = None
    updated_by : int
    is_active: Optional[bool] = True

class ProjectTeamDelete(ProjectTeam):
    pass
