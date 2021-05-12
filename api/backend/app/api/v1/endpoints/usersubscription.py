from typing import List

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app import crud, model, schema
from app.api import deps

router = APIRouter()


@router.get("/{user_id}")
def read_subscriptions(
    *,
    db: Session = Depends(deps.get_db),
    skip: int = 0,
    limit: int = 100,
    user_id: int,
    current_user: model.User = Depends(deps.get_current_active_user),
):
    """
    Retrieve Subscriptions
    """
    if crud.user.is_superuser(current_user):
        get_subscriptions = crud.usersubscription.get_user_subscription(db=db,id = user_id) 
    
    return  get_subscriptions
    

@router.post(
    "/", status_code=status.HTTP_201_CREATED
)
def create_subscription(
    *,
    db: Session = Depends(deps.get_db),
    sub_in: schema.UserSubscriptionCreate,
    current_user: model.User = Depends(deps.get_current_active_user),
):
    """
    Create a new user subscription.
    """

    if not crud.user.is_active(user=current_user):
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Not enough permisions to perform this operation",
        )


    if not crud.user.get(db=db, id=sub_in.user_id):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="user not found",
        )

    if not crud.subscription.get_subscription(db=db, id=sub_in.sub_id):
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Subscription not found",
        )

    usersub = crud.usersubscription.create(
        db=db, obj_in=sub_in, id=current_user.id
        )
    data = usersub
    
    return data


@router.delete("/{usersubscription_id}", response_model = schema.UserSubscriptionBase)
def delete_subscription(
    *,
    db: Session = Depends(deps.get_db),
    question_id: int,
    current_user: model.User = Depends(deps.get_current_active_superuser),
):
    """
    Delete a question option.
    """
    subscriptions = crud.usersubscription.get(db=db, question_id=question_id)

    for subscription in subscriptions:
        if not subscription:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail="Question Option not found"
            )
        if not crud.user.is_superuser(current_user) and (
            subscription.created_by != current_user.id
        ):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST, detail="Not enough permissions"
            )
        crud.subscription.remove(db=db, id=subscription.id)

    crud.question.remove(db=db, id=question_id)
    return subscriptions
