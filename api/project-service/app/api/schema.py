from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class CreateUpdateDictModel(BaseModel):
    def create_update_dict(self):
        return self.dict(
            exclude_unset=True,
            exclude={
                "id",
                "created_on",
                "created_by",
                "is_active",
                "updated_on",
                "updated_by",
            },
        )


class ProjectIn(CreateUpdateDictModel):
    title: str
    description: str
    latitude: str
    longitude: str
    created_on: datetime
    created_by: int
    is_active: Optional[bool] = True


class ProjectMediaIn(CreateUpdateDictModel):
    project_id: int
    media_url: str
    created_on: datetime
    created_by: str
    is_active: Optional[bool] = True


class ProjectTeamIn(CreateUpdateDictModel):
    project_id: int
    user_id: int
    role: str
    created_on: datetime
    created_by: int
    is_active: Optional[bool] = True


class ProjectOut(CreateUpdateDictModel):
    id: Optional[int] = None
    title: Optional[str] = None
    description: Optional[str] = None
    latitude: Optional[str] = None
    longitude: Optional[str] = None
    created_on: Optional[datetime] = None
    created_by: Optional[int] = None
    is_active: Optional[bool] = True


class ProjectMediaOut(CreateUpdateDictModel):
    id: Optional[int] = None
    project_id: Optional[int] = None
    media_url: Optional[str] = None
    created_on: Optional[datetime] = None
    created_by: Optional[str] = None
    is_active: Optional[bool] = True


class ProjectTeamOut(CreateUpdateDictModel):
    id: Optional[int] = None
    project_id: Optional[int] = None
    user_id: Optional[int] = None
    role: Optional[str] = None
    created_on: Optional[datetime] = None
    created_by: Optional[int] = None
    is_active: Optional[bool] = True


class ProjectUpdate(CreateUpdateDictModel):
    id: Optional[int] = None
    title: Optional[str] = None
    description: Optional[str] = None
    latitude: Optional[str] = None
    longitude: Optional[str] = None
    created_on: Optional[datetime] = None
    created_by: Optional[int] = None
    updated_on: Optional[datetime] = None
    updated_by: Optional[int] = None
    is_active: Optional[bool] = True


class ProjectMediaUpdate(CreateUpdateDictModel):
    id: Optional[int] = None
    project_id: Optional[int] = None
    media_url: Optional[str] = None
    Is_focus: Optional[bool] = None
    alt_text: Optional[str] = None
    created_on: Optional[datetime] = None
    created_by: Optional[int] = None
    updated_on: Optional[datetime] = None
    updated_by: Optional[int] = None


class ProjectTeamUpdate(CreateUpdateDictModel):
    id: Optional[int] = None
    project_id: Optional[int] = None
    user_id: Optional[int] = None
    role: Optional[str] = None
    created_on: Optional[datetime] = None
    created_by: Optional[int] = None
    updated_on: Optional[datetime] = None
    updated_by: Optional[int] = None
    is_active: Optional[bool] = True
