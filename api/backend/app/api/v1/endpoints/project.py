from typing import List

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app import crud, model, schema
from app.api import deps

router = APIRouter()


@router.get("/", response_model=List[schema.Project])
def read_projects(
    db: Session = Depends(deps.get_db),
    skip: int = 0,
    limit: int = 100,
    current_user: model.User = Depends(deps.get_current_active_user),
):
    """
    Retrieve projects.
    """
    projects = crud.project.get_multi(db)
    return projects


@router.get("/{id}", response_model=schema.Project)
def read_project(
    *,
    db: Session = Depends(deps.get_db),
    id: int,
    current_user: model.User = Depends(deps.get_current_active_user),
):
    """
    Get project by ID.
    """
    project = crud.project.get_project(db=db, id=id)
    if not project:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="project not found",
        )
    return project


@router.post("/", response_model=schema.Project, status_code=status.HTTP_201_CREATED)
def create_project(
    *,
    db: Session = Depends(deps.get_db),
    project_in: schema.ProjectCreate,
    current_user: model.User = Depends(deps.get_current_active_user),
):
    """
    Create new project.
    """
    if not crud.user.is_superuser(current_user) or not crud.user.is_admin(current_user):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Not enough permissions",
        )

    project = crud.project.create(
        db=db,
        obj_in=project_in,
        id=current_user.id,
    )
    return project


@router.put("/{id}", response_model=schema.Project)
def update_project(
    *,
    db: Session = Depends(deps.get_db),
    id: int,
    project_in: schema.ProjectUpdate,
    current_user: model.User = Depends(deps.get_current_active_user),
):
    """
    Update a project.
    """
    project = crud.project.get_project(db=db, id=id)
    if not project:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="project not found",
        )

    if (
        not crud.user.is_superuser(current_user)
        or not crud.user.is_admin(current_user)
        and (project.created_by != current_user.id)
    ):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Not enough permissions"
        )

    project.updated_by = current_user.id
    project = crud.project.update(
        db=db,
        db_obj=project,
    )
    return project


@router.post("/activate", response_model=schema.Project)
def activate_project(
    *,
    db: Session = Depends(deps.get_db),
    id: int,
    current_user: model.User = Depends(deps.get_current_active_admin),
):
    """
    Activate project by ID.
    """
    project = crud.project.get(db=db, id=id)
    if not project:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="project not found",
        )

    if project.created_by != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="You need another administrator to activate this module.",
        )

    project = crud.project.disable_or_enable(
        db=db,
        id=id,
        updated_by=current_user.id,
    )
    return project


@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_project(
    *,
    db: Session = Depends(deps.get_db),
    id: int,
    current_user: model.User = Depends(deps.get_current_active_superuser),
):
    """
    Delete a project.
    """
    project = crud.project.get(db=db, id=id)
    if not project:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="project not found",
        )
    project = crud.project.remove_project(db=db, id=id)
    return project
