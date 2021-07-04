from typing import Optional

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

class UserSubscriptionBase(BaseModel):
    sub_id: int
    user_id: int
    project_id: int
    is_active: bool

class SubscriptionCreate(Subscription):
    pass

class UserSubscriptionCreate(UserSubscriptionBase):
    is_active: Optional[bool] = True



class SubscriptionUpdate(Subscription):
    description: Optional[str]=None
    price: Optional[str]=None
    charge_cadance: Optional[str]=None
    token_type: Optional[str]=None
    token_amount: Optional[int]=None
    token_cadance: Optional[str]=None
    is_active: Optional[bool] = True

class UserSubscriptionUpdate(UserSubscriptionBase):
    sub_id: Optional[int] = None
    user_id: Optional[int] = None
    project_id: Optional[int] = None
    is_active: Optional[bool] = None

class SubscriptionDelete(SubscriptionUpdate):
    pass

class UserSubscriptionDelete(UserSubscriptionUpdate):
    pass
