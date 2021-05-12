from typing import Optional
from datetime import datetime

from pydantic import BaseModel

# Shared properties
class Project(BaseModel):
    title: str
    description: str
    latitude: str
    longitude: str
    is_active: Optional[bool] = True

class ProjectMedia(BaseModel):
    project_id: int
    media_url: str
    is_profile: Optional[bool] = True


class ProjectTeam(BaseModel):
    project_id: int
    user_id: int
    role: str
    is_active: Optional[bool] = True

#project schema
class ProjectCreate(Project):
    pass

class ProjectUpdate(Project):
    title: Optional[str] = None
    description: Optional[str] = None
    latitude: Optional[str] = None
    longitude: Optional[str] = None
    is_active: Optional[bool] = True

class ProjectDelete(Project):
    pass


#project media schema
class ProjectMediaCreate(ProjectMedia):
    pass

class ProjectMediaUpdate(ProjectMedia):
    media_url: Optional[str] = None
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
    is_active: Optional[bool] = True

class ProjectTeamDelete(ProjectTeam):
    pass
