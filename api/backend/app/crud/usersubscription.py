from sqlalchemy.orm import Session
from fastapi.encoders import jsonable_encoder
from app.crud.base import CRUDBase
from app.model import UserSubscription
from app.schema import UserSubscriptionCreate, UserSubscriptionUpdate


class CRUDUserSubscription(CRUDBase[UserSubscription, UserSubscriptionCreate, UserSubscriptionUpdate]):
    
    def get_user_subscription(self, db: Session, id: int):
        return db.query(self.model).filter(self.model.user_id == id,self.model.is_active == True).all()

    def get_active(self, db: Session):
        return db.query(self.model).filter(self.model.is_active == True).all()

    def create(self, db: Session, *, obj_in: UserSubscriptionCreate, id: int):
        obj_in_data = jsonable_encoder(obj_in)
        db_obj = self.model(
            created_by=id,
            **obj_in_data,
        )
        return db_obj.save(db)

# to be updated to soft delete
    def remove_Subscription(self, db: Session, *, id: int):
        obj = db.query(self.model).filter(self.model.user == id).first()
        db.delete(obj)
        db.commit()
        return obj


usersubscription = CRUDUserSubscription(UserSubscription)
