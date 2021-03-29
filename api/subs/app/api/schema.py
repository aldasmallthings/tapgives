from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class CreateUpdateDictModel(BaseModel):
    def create_update_dict(self):
        return self.dict(
            exclude_unset=True,
            exclude={
                "created_on",
                "created_by",
                "updated_on",
                "updated_by",
            },
        )


class SubsIn(CreateUpdateDictModel):
    price: str
    charge_cadance: str
    token_type: str
    token_amount: int
    token_cadance: str
    is_active: Optional[bool] = True
    created_on: Optional[datetime]=None
    updated_on: Optional[datetime]=None
    updated_by: Optional[int]=None

class UserSubsIn(CreateUpdateDictModel):
    sub_id: int
    user_id: int
    project_id: int
    is_active: Optional[bool] = True
    updated_by: Optional[int]=None
    created_on: Optional[datetime]=None
    updated_on: Optional[datetime]=None


class SubsOut(CreateUpdateDictModel):
    id: Optional[int] = None
    price: Optional[str] =  None
    charge_cadance: Optional[str] = None
    token_type: Optional[str] = None
    token_mount:Optional[int]=None
    token_cadance: Optional[str] = None
    is_active: Optional[bool] = None
    created_on: Optional[datetime]=None
    updated_on: Optional[datetime]=None
    Updated_by: Optional[int]=None

class UserSubsOut(CreateUpdateDictModel):
    id: Optional[int]=None
    sub_id: Optional[int]=None
    user_id: Optional[int]=None
    project_id: Optional[int]=None
    is_active: Optional[bool] = None
    created_on: Optional[datetime]=None
    updated_on: Optional[datetime]=None
    Updated_by: Optional[int]=None


class SubsUpdate(CreateUpdateDictModel):
    id: Optional[int] = None
    price: Optional[str] =  None
    charge_cadance: Optional[int] = None
    token_type: Optional[str] = None
    token_mount:Optional[int]=None
    token_cadance: Optional[int] = True
    is_active: Optional[bool] = True
    created_on: Optional[datetime]=None
    updated_on: Optional[datetime]=None
    Updated_by: Optional[int]=None


class UserSubsUpdate(CreateUpdateDictModel):
    id: Optional[int]=None
    sub_id: Optional[int]=None
    user_id: Optional[int]=None
    project_id: Optional[int]=None
    is_active: Optional[bool] = None
    created_on: Optional[datetime]=None
    updated_on: Optional[datetime]=None
    Updated_by: Optional[int]=None
