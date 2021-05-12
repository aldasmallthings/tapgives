from sqlalchemy import Column, ForeignKey, Integer, String, DateTime, Boolean
from sqlalchemy.orm import relationship
import datetime

from app.db.base import Base



class Subscription(Base):
    __tablename__ = 'subscription'
    id = Column(Integer, primary_key=True, index=True)
    description = Column(String, index=True)
    price = Column(String, index=True)
    charge_cadance = Column(String, index=True)
    token_type = Column(String, index=True)
    token_amount = Column(Integer, index=True)
    token_cadance = Column(String, index=True)
    is_active = Column(Boolean, default=True)
    created_by = Column(Integer, ForeignKey("user.id"))
    updated_by = Column(Integer, ForeignKey("user.id"), nullable=True)


class UserSubscription(Base): 
    __tablename__ = 'usersubscription'  
    id = Column(Integer, primary_key=True, index=True)
    sub_id = Column(Integer, ForeignKey("subscription.id"), nullable=False)
    user_id = Column(Integer, ForeignKey("user.id"), nullable=False)
    project_id = Column(Integer, ForeignKey("project.id"), nullable=False)
    is_active = Column(Boolean, default=True)
    created_by = Column(Integer, ForeignKey("user.id"))
    updated_by = Column(Integer, ForeignKey("user.id"), nullable=True)