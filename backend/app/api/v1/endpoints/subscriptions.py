from typing import List

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app import crud, model, schema
from app.api import deps

router = APIRouter()


@router.get("/", response_model=List[schema.Subscription])
def read_subscriptions(
    db: Session = Depends(deps.get_db),
    skip: int = 0,
    limit: int = 100,
    current_user: model.User = Depends(deps.get_current_active_user),
):
    """
    Retrieve Subscriptions
    """
    if crud.user.is_superuser(current_user):
        get_subscriptions = crud.subscription.get(
            db=db,
            created_by=current_user.id,
            skip=skip,
            limit=limit,
        )
    
    subscription_list = []
    for sub in get_subscriptions:
        print(sub)
        subscription_list.append(sub)
    return  subscription_list
    

@router.post(
    "/", status_code=status.HTTP_201_CREATED
)
def create_subscription(
    *,
    db: Session = Depends(deps.get_db),
    obj_in: schema.SubscriptionCreate,
    current_user: model.User = Depends(deps.get_current_active_user),
):
    """
    Create a new question with options.
    """
    if not crud.user.is_active(current_user):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Not enough permissions",
        )

    sub = crud.subscription.create(
        db=db, obj_in=obj_in, id=current_user.id
        )
    data = []
    if sub:
        get_sub = crud.subscription.get_subscription(db=db,id = sub.id)
        data.append(get_sub)

    return data


@router.delete("/{question_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_subscription(
    *,
    db: Session = Depends(deps.get_db),
    question_id: int,
    current_user: model.User = Depends(deps.get_current_active_superuser),
):
    """
    Delete a question option.
    """
    subscriptions = crud.subscription.get_with_options(db=db, question_id=question_id)

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
