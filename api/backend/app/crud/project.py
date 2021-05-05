from fastapi.encoders import jsonable_encoder
from sqlalchemy.orm import Session

from app.crud.base import CRUDBase
from app.model import Project
from app.schema import ProjectCreate, ProjectUpdate


class CRUDProject(CRUDBase[Project, ProjectCreate, ProjectUpdate]):
    def get_project(self, db: Session, id: int):
        return db.query(self.model).filter(self.model.id == id).first()

    def get_multi(self,db: Session):
        return db.query(self.model).all()


    def create(self, db: Session, *, obj_in: ProjectCreate, id: int):
        obj_in_data = jsonable_encoder(obj_in)
        db_obj = self.model(
            created_by = id,
            **obj_in_data,
        )
        return db_obj.save(db)

    def remove_project(self, db: Session, *, id: int):
        obj = db.query(self.model).filter(self.model.id == id).first()
        db.delete(obj)
        db.commit()
        return obj

    
    def update(self, db: Session, *, id: int,db_obj : ProjectUpdate):
        obj = db.query(self.model).filter(self.model.user_id == id).first()
        db.update(db_obj)
        obj.save(db)
        return obj




project = CRUDProject(Project)
