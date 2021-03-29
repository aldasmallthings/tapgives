from app.api.schema import SubsIn, UserSubsIn
from app.api.db import subscriptions,usersubs,database

#create
async def create_subscription(payload: SubsIn):
    query = subscriptions.insert().values(**payload.dict())
    return await database.execute(query=query)

async def create_user_subscription(payload: UserSubsIn):
    query = usersubs.insert().values(**payload.dict())
    return await database.execute(query=query)
#read
async def get_active_subs():
    query = subscriptions.select(subscriptions.c.is_active == True)
    return await database.fetch_all(query=query)

async def get_sub_by_id(id):
    query = subscriptions.select(subscriptions.c.id == id)
    return await database.fetch_all(query=query)

async def get_user_subs(id):
    query =usersubs.select(usersubs.c.id == id)
    return await database.fetch_all(query=query)

async def get_sub_by_user(uid,sid):
    query = usersubs.select(usersubs.c.sub_id == sid and usersubs.c.user_id == uid)
    return await database.fetch_all(query=query)

#update
async def update_subscription(id: int, payload: SubsIn):
    query = subscriptions.update().where(subscriptions.c.id == id).values(**payload.dict())
    return await database.execute(query=query)

async def update_user_sub(id: int, uid :int,payload: UserSubsIn):
    query = usersubs.update().where(usersubs.c.id == id,usersubs.c.user_id == uid).values(**payload.dict())
    return await database.execute(query=query)

#delete
async def delete_subscription(id: int,model):
    query = subscriptions.update().where(subscriptions.c.id == id).values(is_active = False)
    return await database.execute(query=query)

async def delete_user_subscriptions(id: int,model):
    query = usersubs.update().where(usersubs.c.user_id == id).values(is_active = False)
    return await database.execute(query=query)

async def delete_user_subscription(uid:int,sid:int,model):
    query = usersubs.update().where(usersubs.c.sub_id == sid,usersubs.c.user_id == uid).values(is_active = False)
    return await database.execute(query=query)
