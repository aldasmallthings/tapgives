from fastapi.encoders import jsonable_encoder
from sqlalchemy.orm import Session

from app.crud.base import CRUDBase
from app.model import ProjectTeam
from app.schema import ProjectTeamCreate, ProjectTeamUpdate


class CRUDProjectTeam(CRUDBase[ProjectTeam, ProjectTeamCreate, ProjectTeamUpdate]):
    def get_team(self, db: Session, id: int):
        return db.query(self.model).filter(self.model.id == id).first()

    def create(self, db: Session, *, obj_in: ProjectTeamCreate, id: int):
        obj_in_data = jsonable_encoder(obj_in)
        db_obj = self.model(
            created_by = id,
            **obj_in_data,
        )
        return db_obj.save(db)

    def update(self, db: Session, *, id: int,obj_in : ProjectTeamUpdate):
        obj = db.query(self.model).filter(self.model.user_id == id).first()
        obj.update(obj_in)
        db.save(db)
        return obj

    def remove(self, db: Session, *, id: int):
        obj = db.query(self.model).filter(self.model.user_id == id).first()
        db.delete(obj)
        db.commit()
        return obj


projectteam = CRUDProjectTeam(ProjectTeam)
