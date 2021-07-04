from typing import Optional

from pydantic import BaseModel, EmailStr


# Shared properties
class User(BaseModel):
    name: Optional[str] = None
    email: Optional[EmailStr] = None
    phone: Optional[str] = None
    password: Optional[str] = None
    is_active: Optional[bool] = True
    is_staff: Optional[bool] = False
    is_admin: Optional[bool] = False
    is_superuser: bool = False


# Properties to receive via API on creation
class UserCreate(User):
    name: str
    email:Optional[str]
    phone: str
    password: str


# Properties to receive via API on update
class UserUpdate(User):
    pass

#response model
class UserResponse(BaseModel):
    name: Optional[str] = None
    email: Optional[EmailStr] = None
    phone: Optional[str] = None
    is_active: Optional[bool] = True
    is_staff: Optional[bool] = False
    is_admin: Optional[bool] = False
    is_superuser: bool = False