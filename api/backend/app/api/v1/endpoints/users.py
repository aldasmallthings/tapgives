from typing import List

from fastapi import APIRouter, Body, Depends, HTTPException, status
from fastapi.encoders import jsonable_encoder
from pydantic.networks import EmailStr
from sqlalchemy.orm import Session

from app import crud, model, schema
from app.api import deps
from app.utils import send_new_account_email
from core.config import settings

router = APIRouter()


@router.get("/", response_model=List[schema.User])
def read_users(
    db: Session = Depends(deps.get_db),
    skip: int = 0,
    limit: int = 100,
    current_user: model.User = Depends(deps.get_current_active_superuser),
):
    """
    Retrieve users.
    """
    users = crud.user.get_multi(
        db,
        skip=skip,
        limit=limit,
    )

    data = list()
    for user in users:
        user = crud.user.get_user(db, user.id)
        data.append(
            dict(
                **user,
                user=dict(
                    phone=user.phone,
                    id_no=user.id_no,
                    title=user.title,
                    biography=user.biography,
                    gender=user.gender,
                    organization=user.organization,
                ),
            )
        )

    return data


@router.post("/", response_model=schema.User, status_code=status.HTTP_201_CREATED)
def create_user(
    *,
    db: Session = Depends(deps.get_db),
    user_in: schema.UserCreate,
    current_user: model.User = Depends(deps.get_current_active_superuser),
):
    """
    Create new user.
    """
    user = crud.user.get_by_email(db, email=user_in.email)
    if user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="The user with this username already exists in the system.",
        )
    user = crud.user.create(db, obj_in=user_in)

    if user_in.user is not None:
        user = crud.user.create(db, user_in.user, user.id)

    if settings.EMAILS_ENABLED and user_in.email:
        send_new_account_email(
            email_to=user_in.email,
            username=user_in.email,
            password=user_in.password,
        )
    data = user.__dict__
    data["user"] = dict(
        phone=user.phone,
        id_no=user.id_no,
        title=user.title,
        biography=user.biography,
        gender=user.gender,
        organization=user.organization,
    )
    return data


@router.put("/update", response_model=schema.User)
def update_user_me(
    *,
    db: Session = Depends(deps.get_db),
    password: str = Body(None),
    full_name: str = Body(None),
    email: EmailStr = Body(None),
    current_user: model.User = Depends(deps.get_current_active_user),
):
    """
    Update own user.
    """
    current_user_data = jsonable_encoder(current_user)
    user_in = schema.UserUpdate(**current_user_data)
    if password is not None:
        user_in.password = password
    if full_name is not None:
        user_in.full_name = full_name
    if email is not None:
        user_in.email = email
    user = crud.user.update(
        db,
        db_obj=current_user,
        obj_in=user_in,
    )
    user = crud.user.get_user(db, user.id)
    data = user.__dict__
    data["user"] = dict(
        phone=user.phone,
        id_no=user.id_no,
        title=user.title,
        biography=user.biography,
        gender=user.gender,
        organization=user.organization,
    )
    return data


@router.get("/user", response_model=schema.User)
def read_user_me(
    db: Session = Depends(deps.get_db),
    current_user: model.User = Depends(deps.get_current_active_user),
):
    """
    Get current user.
    """
    user = crud.user.get(db, current_user.id)
    data = current_user.__dict__
    data.pop('password')    
    return data


@router.post("/open", response_model=schema.User, status_code=status.HTTP_201_CREATED)
def create_user_open(
    *,
    db: Session = Depends(deps.get_db),
    password: str = Body(...),
    email: EmailStr = Body(...),
    full_name: str = Body(None),
):
    """
    Create new user without the need to be logged in.
    """
    if not settings.USERS_OPEN_REGISTRATION:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Open user registration is forbidden on this server",
        )
    user = crud.user.get_by_email(db, email=email)
    if user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="The user with this username already exists in the system",
        )
    user_in = schema.UserCreate(
        password=password,
        email=email,
        full_name=full_name,
    )
    user = crud.user.create(db, obj_in=user_in)
    return user


@router.get("/{user_id}", response_model=schema.User)
def read_user_by_id(
    user_id: int,
    current_user: model.User = Depends(deps.get_current_active_user),
    db: Session = Depends(deps.get_db),
):
    """
    Get a specific user by id.
    """

    if not crud.user.is_superuser(current_user):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="The user doesn't have enough privileges",
        )

    user = crud.user.get(db, id=user_id)
    if user == current_user:
        user = crud.user.get_user(db, current_user.id)
        data = current_user.__dict__
        data["user"] = dict(
            phone=user.phone,
            id_no=user.id_no,
            title=user.title,
            biography=user.biography,
            gender=user.gender,
            organization=user.organization,
        )
    return data


@router.put("/{user_id}", response_model=schema.User)
def update_user(
    *,
    db: Session = Depends(deps.get_db),
    user_id: int,
    user_in: schema.UserUpdate,
    current_user: model.User = Depends(deps.get_current_active_superuser),
):
    """
    Update a user.
    """
    user = crud.user.get(db, id=user_id)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="The user with this username does not exist in the system",
        )
    user = crud.user.update(
        db,
        db_obj=user,
        obj_in=user_in,
    )

    user = schema.user
    user_in_db = crud.user.get_user(db, user.id)
    if user_in.user is not None and user_in_db is not None:
        user = crud.user.update(
            db,
            user_in_db,
            user_in.user,
        )
    elif user_in.user is not None and user_in_db is None:
        user = crud.user.create(
            db,
            schema.UserCreate(**user_in.user),
            user.id,
        )
    data = user.__dict__
    data["user"] = dict(
        phone=user.phone,
        id_no=user.id_no,
        title=user.title,
        biography=user.biography,
        gender=user.gender,
        organization=user.organization,
    )
    return data


@router.put("/{user_id}/user", response_model=schema.User)
def update_user(
    *,
    db: Session = Depends(deps.get_db),
    user_in: schema.UserUpdate,
    current_user: model.User = Depends(deps.get_current_active_user),
):
    """
    Update a user user.
    """
    user = crud.user.get_user(db, id=current_user.id)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="The user with this user does not exist in the system",
        )
    user = crud.user.update(
        db,
        db_obj=user,
        obj_in=user_in,
    )
    return user
