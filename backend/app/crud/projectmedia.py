from fastapi.encoders import jsonable_encoder
from sqlalchemy.orm import Session

from app.crud.base import CRUDBase
from app.model import ProjectMedia
from app.schema import ProjectMediaCreate, ProjectMediaUpdate


class CRUDProjectMedia(CRUDBase[ProjectMedia, ProjectMediaCreate, ProjectMediaUpdate]):
    def get_media(self, db: Session, id: int):
        return db.query(self.model).filter(self.model.id == id).first()

    def create(self, db: Session, *, obj_in: ProjectMediaCreate, id: int):
        obj_in_data = jsonable_encoder(obj_in)
        db_obj = self.model(
            created_by = id,
            **obj_in_data,
        )
        return db_obj.save(db)

    def remove_media(self, db: Session, *, id: int):
        obj = db.query(self.model).filter(self.model.user_id == id).first()
        db.delete(obj)
        db.commit()
        return obj


projectmedia = CRUDProjectMedia(ProjectMedia)
