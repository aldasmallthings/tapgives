from typing import Any, Dict, Union


from sqlalchemy.orm import Session

from app.crud.base import CRUDBase
from app.db.security import get_password_hash, verify_password
from app.model import User
from app.schema import UserCreate, UserUpdate


class CRUDUser(CRUDBase[User, UserCreate, UserUpdate]):
    def get_user(self, db: Session, *, id: int):
        return db.query(self.model).filter(self.model.id == id).first()

    def get_by_email(self, db: Session, *, email: str):
        return db.query(self.model).filter(self.model.email == email).first()

    def get_by_name(self, db: Session, *, name: str):
        return db.query(self.model).filter(self.model.name == name).first()

    def get_by_phone(self, db: Session, *, phone: str):
        return db.query(self.model).filter(self.model.phone == phone).first()

    def create(self, db: Session, *, obj_in: UserCreate):
        db_obj = self.model(
            name = obj_in.name,
            phone = obj_in.phone,
            email=obj_in.email,
            password=get_password_hash(obj_in.password),
            is_superuser=obj_in.is_superuser,
        )
        return db_obj.save(db)

    def update(
        self, db: Session, *, db_obj: User, obj_in: Union[UserUpdate, Dict[str, Any]]
    ):
        if isinstance(obj_in, dict):
            update_data = obj_in
        else:
            update_data = obj_in.dict(exclude_unset=True)
        if update_data["password"]:
            password = get_password_hash(update_data["password"])
            del update_data["password"]
            update_data["password"] = password
        return super().update(db, db_obj=db_obj, obj_in=update_data)

    def authenticate(self, db: Session, *, email: str, password: str):
        user = self.get_by_email(db, email=email)
        if not user:
            return None
        if not verify_password(password, user.password):
            return None
        return user

    def is_active(self, user: User):
        return user.is_active if not user.disabled else False

    def is_superuser(self, user: User):
        return user.is_superuser

    def is_admin(self, user: User):
        return user.is_admin


user = CRUDUser(User)
