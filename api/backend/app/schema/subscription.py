from typing import Optional
from datetime import datetime

from fastapi import Path
from pydantic import BaseModel



# Shared properties
class Subscription(BaseModel):
    description: str
    price: str
    charge_cadance: str
    token_type: str
    token_amount: int
    token_cadance: str
    is_active: Optional[bool] = True
    created_on: datetime
    updated_on: datetime
    updated_by: int

class UserSubscriptionBase(BaseModel):
    sub_id: int
    user_id: int
    project_id: int
    is_active: bool
    created_by: int
    updated_by: int
    created_on: datetime
    updated_on: datetime


class SubscriptionCreate(Subscription):
    pass

class UserSubscriptionCreate(UserSubscriptionBase):
    is_active: Optional[bool] = True
    updated_by: Optional[int]= None
    updated_on: Optional[datetime] = None



# update
class SubscriptionUpdate(Subscription):
    description: Optional[str]=None
    price: Optional[str]=None
    charge_cadance: Optional[str]=None
    token_type: Optional[str]=None
    token_amount: Optional[int]=None
    token_cadance: Optional[str]=None
    is_active: Optional[bool] = True
    created_on: Optional[datetime]=None
    updated_on: datetime
    updated_by: int

class UserSubscriptionUpdate(UserSubscriptionBase):
    sub_id: Optional[int] = None
    user_id: Optional[int] = None
    project_id: Optional[int] = None
    is_active: Optional[bool] = None
    created_by: Optional[int] = None
    updated_by: int
    created_on: Optional[datetime] = None
    updated_on: datetime


class SubscriptionDelete(SubscriptionUpdate):
    pass

class UserSubscriptionDelete(UserSubscriptionUpdate):
    pass
