from typing import List

from fastapi import APIRouter, Depends, File, HTTPException, UploadFile, status
from sqlalchemy.orm import Session

from app import crud, model, schema, utils
from app.api import deps

router = APIRouter()


@router.get("/", response_model=List[schema.ProjectTeam])
def read_team(
    db: Session = Depends(deps.get_db),
    skip: int = 0,
    limit: int = 100,
    current_user: model.User = Depends(deps.get_current_active_user),
):
    """
    Retrieve projectteam.
    """
    if crud.user.is_superuser(current_user) or crud.user.is_admin(current_user):
        projectteam = crud.projectteam.get_multi_by_owner(
            db=db,
            created_by=current_user.id,
            skip=skip,
            limit=limit,
        )
    else:
        projectteam = crud.projectteam.get_multi(
            db,
            skip=skip,
            limit=limit,
        )
    return projectteam


@router.get("/{id}", response_model=schema.ProjectTeam)
def read_team(
    *,
    db: Session = Depends(deps.get_db),
    id: int,
    current_user: model.User = Depends(deps.get_current_active_user),
):
    """
    Get team by ID.
    """
    team = crud.projectteam.get(db=db, id=id)
    if not team:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="team not found",
        )
    return projectteam


@router.post("/", response_model=schema.ProjectTeam, status_code=status.HTTP_201_CREATED)
def create_team(
    *,
    db: Session = Depends(deps.get_db),
    team_in: schema.ProjectTeamCreate,
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

    team = crud.projectteam.create(
        db=db,
        obj_in=team_in,
        created_by=current_user.id,
    )
    return team


@router.put("/{id}", response_model=schema.ProjectTeam)
def update_team(
    *,
    db: Session = Depends(deps.get_db),
    id: int,
    team_in: schema.ProjectTeamUpdate,
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
    team = crud.projectteam.update(
        db=db,
        db_obj=team,
        obj_in=team_in,
    )

    return team


@router.put("/activate", response_model=schema.ProjectTeam)
def activate_team(
    *,
    db: Session = Depends(deps.get_db),
    id: int,
    current_user: model.User = Depends(deps.get_current_active_admin),
):
    """
    Activate team by ID.
    """
    team = crud.projectteam.get(db, id)
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

    team = crud.projectteam.disable_or_enable(
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
    team = crud.projectteam.get(db, id)
    if not team:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="team not found",
        )
    team = crud.projectteam.remove(db=db, id=id)
    return team
