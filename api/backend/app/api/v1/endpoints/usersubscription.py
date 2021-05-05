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
        subscription_list.append(sub)
    return  subscription_list
    

@router.post(
    "/", response_model=schema.Subscription, status_code=status.HTTP_201_CREATED
)
def create_subscription(
    *,
    db: Session = Depends(deps.get_db),
    qo_in: schema.SubscriptionCreate,
    current_user: model.User = Depends(deps.get_current_active_user),
):
    """
    Create a new question with options.
    """
    if not crud.user.is_superuser(current_user) or not crud.user.is_admin(current_user):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Not enough permissions",
        )

    if not crud.module.get(db=db, id=qo_in.question.module_id):
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Module not found",
        )

    if not crud.question.get(
        db=db, text=qo_in.question.text, module_id=qo_in.question.module_id
    ):
        question = crud.question.create_with_owner(
            db=db,
            obj_in=qo_in.question,
            created_by=current_user.id,
        )

    options = list()
    for op_in in qo_in.option:
        if not crud.option.get(db=db, text=op_in.text):
            option = crud.option.create_with_owner(
                db=db, obj_in=op_in, created_by=current_user.id
            )
            options.append(option)
        else:
            option = crud.option.get(db=db, text=op_in.text)
            options.append(option)

    if not crud.option.get_with_options(db=db, question_id=question.id):
        for opt in options:
            qo = model.subscription(
                question_id=question.id,
                option_id=opt.id,
                created_by=current_user.id,
            ).save(db=db)

    return dict(
        question=question,
        option=options,
        created_by=current_user.id,
    )


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
