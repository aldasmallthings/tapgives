from typing import List

from fastapi import APIRouter, Depends, File, HTTPException, UploadFile, status
from sqlalchemy.orm import Session

from app import crud, model, schema, utils
from app.api import deps

router = APIRouter()


@router.get("/", response_model=List[schema.ProjectMedia])
def read_team(
    db: Session = Depends(deps.get_db),
    skip: int = 0,
    limit: int = 100,
    current_user: model.User = Depends(deps.get_current_active_user),
):
    """
    Retrieve ProjectMedia.
    """
    if crud.user.is_superuser(current_user) or crud.user.is_admin(current_user):
        ProjectMedia = crud.ProjectMedia.get_multi_by_owner(
            db=db,
            created_by=current_user.id,
            skip=skip,
            limit=limit,
        )
    else:
        ProjectMedia = crud.ProjectMedia.get_multi(
            db,
            skip=skip,
            limit=limit,
        )
    return ProjectMedia


@router.get("/{id}", response_model=schema.ProjectMedia)
def read_team(
    *,
    db: Session = Depends(deps.get_db),
    id: int,
    current_user: model.User = Depends(deps.get_current_active_user),
):
    """
    Get team by ID.
    """
    team = crud.ProjectMedia.get(db=db, id=id)
    if not team:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="team not found",
        )
    return ProjectMedia


@router.post("/", response_model=schema.ProjectMedia, status_code=status.HTTP_201_CREATED)
def create_team(
    *,
    db: Session = Depends(deps.get_db),
    team_in: schema.ProjectMediaCreate,
    image: UploadFile = File(...),
    current_user: model.User = Depends(deps.get_current_active_user),
):
    """
    Create new team.
    """
    if not crud.user.is_superuser(current_user) or not crud.user.is_admin(current_user):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Not enough permissions",
        )

    team = crud.ProjectMedia.create(
        db=db,
        obj_in=team_in,
        created_by=current_user.id,
    )
    return team


@router.put("/{id}", response_model=schema.ProjectMedia)
def update_team(
    *,
    db: Session = Depends(deps.get_db),
    id: int,
    team_in: schema.ProjectMediaUpdate,
    current_user: model.User = Depends(deps.get_current_active_user),
):
    """
    Update a team.
    """
    team = crud.team.get(db=db, id=id)
    if not team:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="team not found",
        )
    if not crud.user.is_superuser(current_user) or not crud.user.is_admin(current_user):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Not enough permissions",
        )
    team.updated_by = current_user.id
    team = crud.ProjectMedia.update(
        db=db,
        db_obj=team,
        obj_in=team_in,
    )

    return team


@router.put("/activate", response_model=schema.ProjectMedia)
def activate_team(
    *,
    db: Session = Depends(deps.get_db),
    id: int,
    current_user: model.User = Depends(deps.get_current_active_admin),
):
    """
    Activate team by ID.
    """
    team = crud.ProjectMedia.get(db, id)
    if not team:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="team not found",
        )

    if team.created_by == current_user.id:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="You need another administrator to activate this team "
        )

    team = crud.ProjectMedia.disable_or_enable(
        db=db,
        id=id,
        updated_by=current_user.id,
    )
    return team


@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_team(
    *,
    db: Session = Depends(deps.get_db),
    id: int,
    current_user: model.User = Depends(deps.get_current_active_superuser),
):
    """
    Delete a team.
    """
    team = crud.ProjectMedia.get(db, id)
    if not team:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="team not found",
        )
    team = crud.ProjectMedia.remove(db=db, id=id)
    return team
