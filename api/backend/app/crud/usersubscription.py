from sqlalchemy.orm import Session

from app.crud.base import CRUDBase
from app.model import UserSubscription
from app.schema import UserSubscriptionCreate, UserSubscriptionUpdate


class CRUDUserSubscription(CRUDBase[UserSubscription, UserSubscriptionCreate, UserSubscriptionUpdate]):
    def get_user_subscription(self, db: Session, id: int):
        return db.query(self.model).filter(self.model.user_id == id).first()

    def create(self, db: Session, *, obj_in: UserSubscriptionCreate, user_id: int):
        obj_in_data = jsonable_encoder(obj_in)
        db_obj = self.model(
            user_id=user_id,
            **obj_in_data,
        )
        return db_obj.save(db)

    def remove_Subscription(self, db: Session, *, id: int):
        obj = db.query(self.model).filter(self.model.user_id == id).first()
        db.delete(obj)
        db.commit()
        return obj


usersubscription = CRUDUserSubscription(UserSubscription)
