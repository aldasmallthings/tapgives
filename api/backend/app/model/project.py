from sqlalchemy import Column, DateTime, ForeignKey, Integer, String, Text, Time,Boolean
from sqlalchemy.orm import relationship

from app.db.base import Base

class Project(Base):
    __tablename__='project'
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String,nullable = False)
    description = Column(String,index = True)
    latitude = Column(Integer)
    longitude = Column(Integer)    
    is_active = Column(Boolean,default=True)
    created_by = Column(Integer, ForeignKey("user.id"))
    updated_by = Column(Integer, ForeignKey("user.id"), nullable=True)


class ProjectTeam(Base):
    id = Column(Integer, primary_key=True, index=True)
    project_id = Column(Integer,ForeignKey('project.id'))
    user_id = Column(Integer,ForeignKey('user.id'))
    role = Column(String,nullable=False)
    is_active = Column(Boolean,default=True)
    created_by = Column(Integer, ForeignKey("user.id"))
    updated_by = Column(Integer, ForeignKey("user.id"), nullable=True)



class ProjectMedia(Base):
    id = Column(Integer, primary_key=True, index=True)
    project_id = Column(Integer,ForeignKey('project.id'))
    media_id = Column(String,nullable = False)
    is_profile = Column(Boolean,default=True)
    created_by = Column(Integer, ForeignKey("user.id"))
    updated_by = Column(Integer, ForeignKey("user.id"), nullable=True)