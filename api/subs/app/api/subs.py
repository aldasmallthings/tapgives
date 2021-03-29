from typing import List
from fastapi import APIRouter, HTTPException

from app.api.schema import (
    SubsIn,
    SubsOut,
    SubsUpdate,
    UserSubsIn,
    UserSubsOut,
    UserSubsUpdate
    )
from app.api import managers

getsubs = APIRouter()
postsubs = APIRouter()
putsubs = APIRouter()
deletesubs = APIRouter()

@getsubs.get("/active", response_model=List[SubsOut])
async def get_active_subscriptions():
    return await managers.get_active_subs()


@getsubs.get("/{id}/",response_model = List[SubsOut])
async def get_subscription_by(id: int):
    subscriptions = await managers.get_sub_by_id(id)
    if not subscriptions:
        raise HTTPException(
            status_code=404,
            detail="Subscription not found",
        )
    return subscriptions


@getsubs.get("/user/{id}/", response_model=UserSubsOut)
async def get_user_subscriptions(id: int):
    subscriptions = await managers.get_user_subs(id)
    if not subscriptions:
        raise HTTPException(
            status_code=404,
            detail="No subscriptions found",
        )
    return subscriptions


@getsubs.get("/user/{uid}/sub/{sid}/", response_model=UserSubsOut)
async def get_user_subscriptions(uid: int,sid: int):
    subscription = await managers.get_sub_by_user(uid, sid)
    if not subscription:
        raise HTTPException(
            status_code=404,
            detail="No subscriptions found",
        )
    return subscription



@postsubs.post("/", response_model=SubsOut, status_code=201)
async def create_subscription(payload: SubsIn):
    sub_id = await managers.create_subscription(payload)
    response = {"id": sub_id, **payload.dict()}
    return response


@postsubs.post("/user/", response_model=SubsOut, status_code=201)
async def create_user_subscription(payload: UserSubsIn):
    sub_id = await managers.create_user_subscription(payload)
    response = {"id": sub_id, **payload.dict()}
    return response

@putsubs.put("/{id}/", response_model=SubsOut)
async def update_subscription(id: int, payload: SubsUpdate):
    Subscription = await managers.get_sub_by_id(id)
    if not Subscription:
        raise HTTPException(
            status_code=404,
            detail="Subscription not found",
        )
    update_data = payload.dict(exclude_unset=True)
    subs_in_db = SubsIn(**Subscription)
    updated_sub = subs_in_db.copy(update=update_data)
    result_id = await managers.update_subscription(id, updated_sub)
    return await managers.get_sub_by(result_id)


@putsubs.put("/user/{uid}/sub/{sid}", response_model=UserSubsOut)
async def update_user_subscription(uid: int, sid:int,payload: UserSubsUpdate):
    subscription = await managers.get_sub_by_user(uid,sid)
    if not subscription:
        raise HTTPException(
            status_code=404,
            detail="User subscription not found",
        )
    update_data = payload.dict(exclude_unset=True)
    subs_in_db = UserSubsIn(**subscription)
    updated_sub = subs_in_db.copy(update=update_data)
    result_id = await managers.update_user_sub(id,uid,updated_sub)
    return await managers.get_sub_by_user(result_id,id)


@deletesubs.delete("/{id}/", response_model=None)
async def delete_subscription(id: int):
    sub = await managers.get_sub_by_id(id)
    if not sub:
        raise HTTPException(status_code=404, detail="Subscription not found")
    return await managers.delete_subscription(id)


@deletesubs.delete("/user/{uid}", response_model=None)
async def delete_user_subs(id: int):
    sub = await managers.get_user_subs(id)
    if not sub:
        raise HTTPException(status_code=404, detail="User Subscriptions not found")
    return await managers.delete_user_subscriptions(id)


@deletesubs.delete("/user/{uid}/sub/{sid}", response_model=None)
async def delete_user_sub(uid: int,sid: int):
    sub = await managers.get_sub_by_user(uid,sid)
    if not sub:
        raise HTTPException(status_code=404, detail="User Subscription not found")
    return await managers.delete_user_subscription(uid,sid)
